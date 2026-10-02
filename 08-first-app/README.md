# 08. A fresh NestJS project

From the setup slides and the AppModule, controller, service and main file slides
(pages 015 to 020).

This is exactly what `nest new` produces today. Nothing added. Open it next to
the slides and walk the files one by one.

## Run it

```bash
npm install
```

```bash
npm run start:dev
```

Then open:

```
http://localhost:3000
```

It says `Hello World!`. Tests, no server needed:

```bash
npm test
```

## Where each slide lives

| Slide | File |
|---|---|
| Folder structure (016) | the whole `src/` folder |
| AppModule (017) | `src/app.module.ts` |
| Controller (018) | `src/app.controller.ts` |
| Service and `@Injectable()` (019) | `src/app.service.ts` |
| Main file (020) | `src/main.ts` |

## Worth showing

Follow one request through the files. `main.ts` starts the app from
`AppModule`. The module lists `AppController` and `AppService`. The controller's
`@Get()` handles `/`, and it never creates the service itself. It just asks for
one in its constructor, and Nest hands it over. That is dependency injection,
the same idea as folder 10 in Lab 2, done for you.

Change the string in `app.service.ts` while `start:dev` is running. The server
restarts and the browser shows the new text on refresh.

## What is different from the slides

The CLI has moved on since the slides were made. Running `npm i -g @nestjs/cli`
today gives NestJS 12, so students will see this, not the screenshot.

- Imports end in `.js`, like `'./app.service.js'`. The project is now an ES
  module, and that is how Node finds the files. Leave the `.js` off and the build
  fails.
- `main.ts` ends with `await bootstrap()` and reads the port from `PORT` first.
- There is no `.eslintrc.js`. Linting uses `oxlint` (`oxlint.json`) and tests
  use Vitest instead of Jest.

One thing was broken in the template itself. `test/app.e2e-spec.ts` imported
`'supertest/types'`, which the editor marks as an error under the new module
settings. It is `'supertest/types.js'` here. The tests ran either way, only
`tsc` and the editor complained.
