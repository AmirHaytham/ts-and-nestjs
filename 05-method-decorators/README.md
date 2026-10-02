# 05. Method decorators

From the method decorators slide (page 010) and the use cases on page 012.

The slide's `@Log` on a calculator, then two of the use cases from the summary
slide: access control with `@Roles` and timing with `@Timed`.

## Run it

```bash
npm install
```

```bash
npm start
```

## Worth showing

`Calling add with [ 2, 3 ]` and `Result: 5` match the slide exactly.

Point at `originalMethod.apply(this, args)`. The `Counter` example shows why:
the wrapper still updates `this.count`. Call the original as
`originalMethod(...args)` instead and `this` is lost, so it crashes.

`@Roles('ta', 'doctor')` blocks the student and lets the TA through. Same
method, nothing inside it changed. NestJS guards work on the same idea, just
with more around it.

The descriptor line prints `writable`, `enumerable` and `configurable`, the three
flags listed on the slide.
