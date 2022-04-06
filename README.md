# Markdown Compiler

## Instructions
Link the script to your html file.
```html
<script src="modules.surge.sh/markdown-compiler/script.js"></script>
```

Add a markdown tag with the markdown typed directly inside the tag, or linking with the source attribute.
```html
<markdown src="path/to/markdown-file.md"></markdown>
```
or
```html
<markdown>
    # Heading
    [link](https://example.com)
</markdown>
```

## Markdown Syntax
| Markdown                                             | HTML                                                                                          | Description                  |
| :--------------------------------------------------- | :-------------------------------------------------------------------------------------------- | :--------------------------- |
| # Heading 1                                          | &lt;h1 id="heading-1">Heading 1&lt;/h1>                                                       | Heading 1                    |
| ## Heading 2                                         | &lt;h2 id="heading-2">Heading 2&lt;/h2>                                                       | Heading 2                    |
| ### And a heading 3                                  | &lt;h3 id="and-a-heading-3">Heading 3&lt;/h3>                                                 | Heading 3                    |
| \*Italic\*                                           | &lt;i>Italic&lt;/i>                                                                           | Italic                       |
| \*\*Bold\*\*                                         | &lt;b>Bold&lt;/b>                                                                             | Bold                         |
| \*\*\*Bold and Italic\*\*\*                          | &lt;b>Bold&lt;/b>&lt;i>Bold and Italic&lt;/i>                                                 | Bold and italic              |
| \~\~Strikethrough\~\~                                | &lt;s>Strikethrough&lt;/s>                                                                    | Strikethrough                |
| \=\=Highlight\=\=                                    | &lt;mark>Highlight&lt;/mark>                                                                  | Highlight                    |
| \[Link](https://example.com)                         | &lt;a href="https://example.com">Link&lt;/a>                                                  | Link                         |
| !\[Alt text](https://example.com/image.png)          | &lt;img src="https://example.com/image.png" alt="Alt text">                                   | Image                        |
| ---                                                  | &lt;hr>                                                                                       | Horizontal rule              |
| \`inline code block`                                 | &lt;code>inline code block&lt;/code>                                                          | Inline code block            |
| \```put multi line code in here```                   | &lt;code>put multi line code in here&lt;/code>                                                | Code block                   |
| > This is a blockquote.                              | &lt;blockquote>This is one blockquote.&lt;/blockquote>                                        | Blockquote                   |
| - List item 1<br>- List item 2<br>- List item 3      | &lt;ul>&lt;li>List item 1&lt;/li>&lt;li>List item 2&lt;/li>&lt;li>List item 3&lt;/li>&lt;/ul> | Unordered list               |
| 1. List item 1<br>2. List item 2<br>3. List item 3   | &lt;ol>&lt;li>List item 1&lt;/li>&lt;li>List item 2&lt;/li>&lt;li>List item 3&lt;/li>&lt;/ol> | Ordered list                 |
| \| Column 1 \| Column 2 \|<br>\| Thing&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \| Thingy&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\| | | Table               |

Other notes:
- Heading id's default to what's in the heading, to lower case, with "-" instead of spaces.
- You can change the id of a heading by typing {#your-custom-id} after it (there must be a space between the heading and the opening curly brace)
- Put a "+" after a link to make it open in a new tab, e.g. \[Link](https://example.com)+
