# 07. Decorator execution order

From the execution order slide (page 012).

The slide's `Example` class with all four kinds, the same class with its members
swapped, and two decorators stacked on one method.

## Run it

```bash
npm install
```

```bash
npm start
```

## Worth showing

**The slide's list does not match what runs.** It says parameter, method,
property, class. The real output for the slide's own class is property,
parameter, method, class.

The rule written on the slide is the right one: members run in the order they
appear in the class. `prop` is written before `greet`, so `@PropDec` comes first.
The numbered list just does not follow it. Swap the two members and the order
changes, which the second block shows.

What is always true: a method's parameter decorators run right before that
method's decorator, and the class decorator runs last.

**Stacked decorators have two phases.** `Outer()` and `Inner()` are evaluated top
to bottom, then applied bottom to top. That is what "bottom to top" on the slide
means.

The last block shows "outer wraps inner" at call time. `outer before` prints
first and `outer after` prints last, with `inner` in the middle. Like layers of
an onion.
