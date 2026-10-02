# 03. Decorator factory

From the decorator factory slide (page 008).

The slide's `classDecoratorExample('Student')`, then the same idea doing
something useful: one `@Entity` factory used twice with two table names.

## Run it

```bash
npm install
```

```bash
npm start
```

## Worth showing

The first line printed is the factory being called with `'Student'`. Only then
does the real decorator run. Two steps: your call, then TypeScript's call.

The problem on the slide is that TypeScript decides the decorator's arguments.
The factory is the way around it: an outer function that takes whatever you want
and returns the decorator.

The `@Controller('students')` at the bottom is the bridge to NestJS. Almost every
Nest decorator is a factory, which is why they all have brackets:
`@Controller()`, `@Get(':id')`, `@Injectable()`.
