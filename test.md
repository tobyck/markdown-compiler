# Heading 1 {#custom-id}
## Heading 2
### Heading 3

*Italic*
**Bold**
***Bold and Italic***
~~Strikethrough~~
==Highlight==

[Link](https://tobyck.surge.sh)+ that opens in a new tab
and [a link](https://tobyck.surge.sh) that doesn't.
![alt text](https://tobyck.surge.sh/TobyFavicon.png)

---

You can write in a $sort-of math-looking font$, ^superscript^, and ~subscript~.

`pip install prime_test` will install the pip module called `prime_test`.

This is a primality test:
```
# comment
import random
def test(n, k = 40):
    if n < 2 or (n % 2 == 0 and n > 2): return False
    if n in [2, 3]: return True
    s = n - 1
    for _ in range(k):
        a = random.randrange(2, n - 1)
        x = pow(a, s, n)
        if x in [1, -1]:
            continue
        else:
            return False
    return True
```

> This is one 
> blockquote.

> Me ko tētahi atu tēnei

Unordered list:
- Thing
- Other thing
- And another thing

You can also do ordered ones:

1. Mea tahi
2. Mea rua
3. Me ohomauri ohomauri... mea toru! 

| Column 1 | Column 2 | Column 3 |
| 1        | 2        | 3        |
| 4        | 5        | 6        |
| 7        | 8        | 9        |

And of course,
normal paragraphs.