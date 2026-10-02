# 04. Property decorators

From the property decorators slide (page 009).

The slide's `@LogProperty` and `@Readonly`, run for real, then a version of
`@Readonly` that actually works.

## Run it

```bash
npm install
```

```bash
npm start
```

Then the same code with the older way of creating fields:

```bash
npm run old-fields
```

## Worth showing

`@LogProperty` gets the prototype for `name` and the class itself for the static
`school`. That matches the slide.

**The slide's `@Readonly` does not work.** With today's TypeScript settings,
`obj.name = "Bob"` goes through without any error and `name` becomes `Bob`.

Here is why. The decorator runs once and marks `name` read only on the
prototype. Then every `new MyClass()` runs the field initializer, which creates
a brand new `name` directly on the object. The object's own property hides the
prototype's one, so the read only flag is never looked at. Folder 01's last
block showed this same hiding.

`npm run old-fields` compiles with `useDefineForClassFields` off, the way older
TypeScript did. Now it fails, but at `new MyClass()`, while setting `"Alice"`. It
never even gets to `"Bob"`.

**The error on the slide is a different thing.** "Cannot assign to 'name'
because it is a read-only property" is what TypeScript prints for the `readonly`
keyword, at compile time. A decorator runs at runtime and cannot produce a
compile error.

The working version splits the job. `@Locked` only records the field name. A
class decorator then locks those fields on each object after it is built. This
is the usual pattern: property decorators record, something else acts.

NestJS projects use the newer field behaviour too (their tsconfig targets
ES2023), so the slide's version would silently do nothing there as well.

## About strict mode

The slide writes `name: string;` with no value. Strict mode rejects that because
nothing ever sets it, so it is `name!: string` here. NestJS projects turn
`strictPropertyInitialization` off in their tsconfig, which is why schema
classes there get away without the `!`.
