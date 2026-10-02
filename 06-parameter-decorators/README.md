# 06. Parameter decorators

From the parameter decorators slide (page 011).

The slide's `@LogParameter`, then a `@Required` parameter decorator working with
a `@Validate` method decorator, the validation use case from page 012.

## Run it

```bash
npm install
```

```bash
npm start
```

## Worth showing

The decorator's message is printed before the object is created, and calling
`greet` does not print it again. It runs once, when the class is defined. The
slide's output makes it look like it comes from `greet("Alice")`.

A parameter decorator only gets the method name and the index. It cannot see the
value or change it. So on its own it can only remember something. `@Required`
remembers "arguments 0 and 1 are required", and `@Validate` checks that list on
every call. `enroll('Omar', '')` fails with a clear message.

This is how `@Body()` and `@Param('id')` work in NestJS. They record which
argument is which, and Nest fills them in when a request arrives. Folder 09 has
them on every controller method.
