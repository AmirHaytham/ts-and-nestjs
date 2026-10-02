# 02. Class decorators

From the decorators overview and the class decorators slide (pages 006 and 007).

Both examples from the slide: one that logs the class name, one that adds a
`timestamp` to the prototype. Plus one that returns a new class, the last bullet
on the slide.

## Run it

```bash
npm install
```

```bash
npm start
```

## Worth showing

"Decorator called for: Student" is printed before any `Student` exists. The
decorator runs when the class is defined, not when you call `new`.

**The slide's code does not compile as written.** `console.log(obj.timestamp)`
gives `Property 'timestamp' does not exist on type 'MyClass'`. The decorator
adds it at runtime, and TypeScript has no idea. The fix here is an interface
with the same name as the class, which TypeScript merges into it. Worth asking
the room why the compiler cannot see it.

**Every instance gets the same timestamp.** It is set once, on the prototype,
when the class is defined. The code waits 50 ms and makes a second object to
prove it: same date. So it is the time the class was loaded, not the time the
object was created.

The last example fixes that by returning a subclass that sets `createdAt` in its
own constructor. Two courses made 50 ms apart get two different dates, and
`instanceof Course` still works.

## About the tsconfig

`experimentalDecorators` is on in every folder. TypeScript now also has standard
decorators, with different arguments. NestJS still uses the experimental kind,
and that is the kind these slides describe.
