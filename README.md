# TypeScript and intro to NestJS

Examples for Tutorial 4: prototypes, the four kinds of decorators, and a first
NestJS app connected to MongoDB.

Every code sample on the slides is here and runs. Each folder has its own README
with the command, the slides it covers, and what to point at while it is on
screen.

## The folders

| # | Folder | Slides | Run |
|---|---|---|---|
| 01 | `01-prototype` | Object prototype, the chain (003, 004) | `npm start` |
| 02 | `02-class-decorators` | Decorators, class decorators (006, 007) | `npm start` |
| 03 | `03-decorator-factory` | Decorator factory (008) | `npm start` |
| 04 | `04-property-decorators` | Property decorators (009) | `npm start` |
| 05 | `05-method-decorators` | Method decorators (010) | `npm start` |
| 06 | `06-parameter-decorators` | Parameter decorators (011) | `npm start` |
| 07 | `07-execution-order` | Execution order, use cases (012) | `npm start` |
| 08 | `08-first-app` | Setting up NestJS, module, controller, service, main (015 to 020) | `npm run start:dev` |
| 09 | `09-student-management` | AppModule and MongoDB with Mongoose (017, 021) | `npm run start:dev` |

Run `npm install` once inside a folder before its first run.

## Everything at once

From this folder:

```bash
node run-all.js
```

It runs 01 to 07 one after another, then prints the decorator metadata from
folder 09, so the whole first half of the tutorial scrolls by in one terminal.
Pass folder numbers to run only those:

```bash
node run-all.js 04 07
```

## What you need

Node 20 or newer. Folder 09 also needs MongoDB on `localhost:27017`, the address
on the slide. Nothing else touches a database.

## Things the examples caught

Running the slides' code turned up a few places where it does not do what the
slide says. Worth knowing before class, because a sharp student will notice.

- The class decorator slide's `obj.timestamp` does not compile, and the
  timestamp is the same for every object. Folder 02.
- The slide's `@Readonly` does not make anything read only. `obj.name = "Bob"`
  just works. The error shown on the slide comes from the `readonly` keyword,
  not from a decorator. Folder 04 explains why and has a version that works.
- The execution order list says parameter, method, property, class. For the
  slide's own class it is really property, parameter, method, class. Folder 07.
- `nest new` now gives NestJS 12: `.js` on every import, Vitest instead of Jest,
  oxlint instead of ESLint. The folder structure screenshot no longer matches.
  Folder 08.
- Mongoose 9 warns about `{ new: true }`, which almost every tutorial uses.
  Folder 09.

## Suggested order for a live session

1. **01** answer the three questions first, then run it.
2. **02** the class decorator, and why every object has the same timestamp.
3. **03** the factory, then point out that every Nest decorator has brackets.
4. **04** run the slide's `@Readonly` and let the room explain why it failed.
5. **05** the logger, then `@Roles`.
6. **06** parameter decorators only record. `@Body()` is the payoff.
7. **07** the order, compared with the slide.
8. **08** follow one request through the generated files.
9. **09** the student API, then `npm run peek` to tie it back to decorators.

Short on time? The spine is **04, 07, 09**.
