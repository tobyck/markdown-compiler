function compile(md) {
    var final = "",
        state = null;
    
    function compileParagraph(md) {
        return md.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
                    .replace(/\*(.+?)\*/g, "<i>$1</i>")
                    .replace(/~~(.+?)~~/g, "<s>$1</s>")
                    .replace(/==(.+?)==/g, "<mark>$1</mark>")
                    .replace(/\[(.+)\]\(([^ ]+?)\)\+/g, "<a href='$2' target='_blank'>$1</a>")
                    .replace(/!\[(.*)\]\(([^ ]+?)\)/g, "<img src='$2' alt='$1'>")
                    .replace(/\[(.+)\]\(([^ ]+?)\)/g, "<a href='$2'>$1</a>")
                    .replace(/\$(.+?)\$/g, "<span class='math'>$1</span>")
                    .replace(/\^(.+?)\^/g, "<sup>$1</sup>")
                    .replace(/~(.+?)~/g, "<sub>$1</sub>")
                    .replace(/`(.+?)`/g, "<code class='inline-code-block'>$1</code>");
    }

    function endToken() {
        if (state == "p") {
            final += "</p>";
            state = null;
        } else if (state == "blockquote") {
            final += "</blockquote>"
            state = null;
        } else if (state == "ul") {
            final += "</ul>"
            state = null;
        } else if (state == "ol") {
            final += "</ol>"
            state = null;
        } else if (state == "table") {
            final += "</table>"
            state = null;
        }
    }

    function addParagraph() {
        if (state != "p") {
            state = "p";
            final += "<p>" + compileParagraph(line);
        } else {
            final += "<br>" + compileParagraph(line);
        }
    }

    for (line of md.split("\n")) {
        if (line.trim().length == 0) {
            endToken();
            final += "<br>"
        } else if (/^ *-{3,} */.test(line)) {
            endToken();
            final += "<hr>"
        } else if (/^ *#{1,3} *.+ *(\{#.+\})?/.test(line) && state == null) {
            endToken();
            var headingType = line.match(/(?<=^ *)#{1,3}/)[0].length,
                id = line.match(/(?<= +\{#).+(?=\})/) || line.match(/(?<=# +).+/);
            final += `<h${headingType} id="${id[0].toLowerCase().trim().replace(/ /g, "-").replace(/[^\w-]/g, "")}">${line.match(/(?<=#{1,3} ).+(?=\{?)/)[0].replace(/\{#.+\}/, "")}</h${headingType}>`;
        } else if (/^ *``` */.test(line)) {
            endToken();
            if (state != "code") {
                state = "code";
                final += "<div class='mlcb-container'><code>";
            } else {
                state = null;
                final += "</code></div><br>";
            }
        } else if (/^ *> *.+/.test(line)) {
            if (state != "blockquote") {
                endToken();
                state = "blockquote";
                final += "<blockquote>" + compileParagraph(line.replace(/^ *> */, ""));
            } else {
                final += "<br>" + compileParagraph(line.replace(/^ *> */, ""));
            }
        } else if (/^ *- *.+/.test(line)) {
            if (state != "ul") {
                endToken();
                state = "ul"
                final += "<ul>";
            }
            final += "<li>" + compileParagraph(line.replace(/^ *- */, "")) + "</li>";
        } else if (/^ *\d+\. *.+/.test(line)) {
            if (state != "ol") {
                endToken();
                state = "ol"
                final += "<ol>";
            }
            final += "<li>" + compileParagraph(line.replace(/^ *\d\. */, "")) + "</li>";
        } else if (/^ *(\|.+)+\| *$/.test(line)) {
            if (state != "table") {
                endToken();
                state = "table";
                var headers = line.split("|").slice(1, -1).map(header => header.replace(/^ /, "").replace(/ $/, ""));
                final += "<table><thead>"
                for (header of headers) {
                    final += `<th>${header}</th>`
                }
                final += "</thead>"
            } else {
                var data = line.split("|").slice(1, -1).map(header => header.replace(/^ /, "").replace(/ $/, ""));
                final += "<tr>"
                for (item of data) {
                    final += `<td>${item}</td>`
                }
                final += "</tr>"
            }
        } else {
            if (state == "code") {
                final += line + "<br>";
            } else if (state == "blockquote") {
                endToken();
            } else {
                addParagraph();
            }
        }
    }

    return final;
}

var stylesheet = document.createElement("link");
stylesheet.rel = "stylesheet";
stylesheet.href = "https://modules.surge.sh/markdown-compiler/default-styles.css";
document.head.appendChild(stylesheet);

for (element of document.getElementsByTagName("markdown")) {
    var src = element.outerHTML.match(/(?<=src=\")[^ ]+(?=\")/);

    if (src) {
        var xhr = new XMLHttpRequest();
        xhr.onload = () => element.innerHTML = compile(xhr.responseText);
        xhr.open("GET", src[0]);
        xhr.send();
    } else {
        element.innerHTML = compile(element.innerHTML);
    }
}