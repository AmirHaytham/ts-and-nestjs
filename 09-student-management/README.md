# 09. Student management with MongoDB

From the AppModule slide (page 017) and the Mongoose slide (page 021).

The project from the slides, built the way they say: `nest new
student-management`, then `nest g module`, `nest g controller` and
`nest g service` for `student` and `courses`, then Mongoose connected in
`AppModule`.

## Run it

You need MongoDB running locally on port 27017, the address on the slide.

```bash
npm install
```

```bash
npm run start:dev
```

Then, in a second terminal, call every route once:

```bash
npm run demo
```

Or open these in the browser:

```
http://localhost:3000/student
```
```
http://localhost:3000/courses
```

To use Atlas or another database instead, set `MONGODB_URI` before starting.

## The routes

| Method | Route | What it does |
|---|---|---|
| GET | `/student` | all students |
| GET | `/student/:id` | one student, with their courses filled in |
| POST | `/student` | create a student |
| PATCH | `/student/:id` | update a student |
| DELETE | `/student/:id` | delete a student |
| POST | `/student/:id/courses/:courseId` | enroll a student in a course |
| GET | `/courses` | all courses |
| GET | `/courses/:id` | one course |
| POST | `/courses` | create a course |
| DELETE | `/courses/:id` | delete a course |

## Worth showing

**Modules talking to each other.** Enrolling needs to check that the course
exists. `StudentService` asks for `CoursesService` in its constructor. That only
works because `CoursesModule` lists it under `exports` and `StudentModule`
imports `CoursesModule`. Remove either line and Nest refuses to start, with an
error that names the missing provider. Worth doing live.

**Where the decorators from the first half went.** Run:

```bash
npm run peek
```

It prints what the decorators stored. `@Prop()` never says "string", yet
Mongoose knows `name` is a `String`, because TypeScript recorded the type
(`emitDecoratorMetadata` in the tsconfig). Nest knows `StudentService` needs a
`Model` and a `CoursesService` the same way. And `@Get(':id')` is just a factory
that stored `GET` and `:id` on the method, like folder 03.

**What `npm run demo` shows.** A duplicate email gives 409, a student with no
name and age 12 gives 400 with every problem listed, a bad id gives 400, and a
missing course gives 404. Without the small helper in `src/common` all of those
would be a plain 500.

The slides stop before validation, so the bodies are not checked by DTOs here.
Mongoose's own rules in the schema (`required`, `unique`, `min`) do the checking.

## What is different from the slides

Everything in folder 08's README applies here too: NestJS 12, `.js` on imports,
Vitest and oxlint.

`findByIdAndUpdate(id, data, { new: true })` is in almost every tutorial online.
Mongoose 9 now prints a deprecation warning for it. The new spelling is
`{ returnDocument: 'after' }`, used here.

The connection string falls back to `mongodb://localhost:27017/nestStudent` from
the slide, so it runs with no setup.
