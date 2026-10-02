# 01. Object prototype and the chain

From the prototype slides (pages 003 and 004).

A `User` class with one field and one method, then the three questions from the
slide answered by the code itself, then the chain walked one link at a time.

## Run it

```bash
npm install
```

```bash
npm start
```

## Worth showing

Ask the three questions before running anything. Most people get the first one
right and the third one wrong: `Object.keys(user)` is just `['name']`, because
`greet` was never on the object.

`user.name === other.name` is false but `user.greet === other.greet` is true.
Data is per object, methods are shared. That one pair of lines is the whole
slide.

The chain walk prints what each link owns, ending at `null`. Then `user.fly`
comes back `undefined` because the lookup reached `null` without finding it.
That is the third step of the rule.

The last two blocks are what makes the next slides make sense. Adding `wave` to
the prototype gives it to every user at once. That is exactly what a class
decorator does with `target.prototype`. And an own property hides the one on the
prototype, which is the reason the slide's `@Readonly` fails in folder 04.

The slide's third question says `Object.keys(u)` while the object is called
`user`. Same thing, just a typo on the slide.
