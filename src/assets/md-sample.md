# Hi there,

Welcome to _glam-mailer_! Below is a rundown of some of the features that is supported for now. Stay tuned as the list of features will keep growing!

## Basic Features

We support styling in [Markdown](http://en.wikipedia.org/wiki/Markdown), so all the basic formatting syntax like _italics_, **bold**, and `code` are supported.

If you don't know Markdown, I strongly recommend learning it, as it is a really powerful language! It is essentially just writing normal text (as you can see here), only with extra features. For example, a divier below:

---

Or perhaps, tables:

| No. | Name      | Email          |
| :-: | --------- | -------------- |
|  1  | John Doe  | jd@email.org   |
|  2  | Anonymous | anon@email.xyz |
|  3  | Cassandra | cass@email.com |

_(Did you notice that the emails are also automatically converted to links?)_

---

Images can be specified like so:

![Example Image](https://picsum.photos/512 "Hover me!")

---

Markdown has a lot more features, but there are plenty of guides and/or cheat-sheets online for that, so I will not go into more detail here. Note that you can backslash-escape any punctuation characters which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.

In addition, we also have additional features as detailed in the following section.

## Additional Features

### GitHub-Flavored Markdown (GFM)

We also support a subste of the [GFM](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) specification, so stuff like ~~strikethrough~~ text are also available. Oh, and not to mention, :heart*eyes: \_emojis* :smile: :sparkles: :exclamation:

> Click [here](https://gist.github.com/rxaviers/7360908) for the full list of supported emojis

### HTML Escaped Characters

If you are not familiar, here are some examples:

- Left/Right/Up/Down arrow: &larr;/&rarr;/&uarr;/&darr;
- Section symbol, e.g. Section &sect; 1

Click [here](https://mateam.net/html-escape-characters/) or do an online search for a full list :smile:.

### Smart Punctuation

- This is some "quoted text" &rarr; notice that they have become "smart quotes", just like in a normal email/office document!
- Also, look what happens when I type in a _double-hyphen_ -- it automatically becomes a _dash_!
- And when I type three dots, it becomes an ellipsis...

### Syntax Highlighting for Code

When you specify a language in a code block, the corresponding syntax highlighting rules are applied. For example, the following shows a snippet of some JavaScript code:

```js
// This is a single-line comment
const test = 3;
```

### Auto-shortening Links

If you type in a super long, unlabelled link like https://gist.github.com/rt2zz/e0a1d6ab2682d2c47746950b84c0b6ee, it will automatically get shortened!

### Mathematical Equations

If you are familar with [LaTeX](https://www.malinc.se/math/latex/latexontheweben.php), you can also use them, either by inlining LaTeX code like this: $\int_0^\infty x^2 dx$, or by using a block like this:

$$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$

Notice how they are formatted as images -- you can easily copy paste them anywhere, or attach them directly together with the email message.

### UML Diagrams

You can render UML diagrams using [PlantUML](https://plantuml.com/), which is a language for creating diagrams. For example, this will produce a sequence diagram:

```plantuml
participant Participant as Foo
actor       Actor       as Foo1
boundary    Boundary    as Foo2
control     Control     as Foo3
entity      Entity      as Foo4
database    Database    as Foo5
collections Collections as Foo6
queue       Queue       as Foo7
Foo -> Foo1 : To actor
Foo -> Foo2 : To boundary
Foo -> Foo3 : To control
Foo -> Foo4 : To entity
Foo -> Foo5 : To database
Foo -> Foo6 : To collections
Foo -> Foo7: To queue
```

And this will produce a flow chart:

```plantuml
(*) --> "Wake up"
"Wake up" --> "Do Work"
"Do Work" --> "Sleep"
"Sleep" --> (*)
```

_**Acknowledgment:** The first UML example is taken from [their webpage](https://plantuml.com/sequence-diagram)._
