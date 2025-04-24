# Book Lending Library

A TypeScript-based book lending library implemented as a reusable module. The project is test-driven and intended to be used as a library without a main entry point.

## Project Setup

- Language: TypeScript 5.8.3
- Package Manager: npm
- Linting: ESLint
- Testing: Vitest
- Entry Point: None (library-only design)
```bash
npm install
```

## Design

The core of the design is the `libraryClient`, which is created using:

- a `bookProvider`
- a list of `users`
- an `owner`

From the `libraryClient`, two interfaces are exposed:

### `libraryUserClient`

Used by users to:

- Filter books by attributes
- Borrow books

### `libraryOwnerClient`

Used by the owner to:

- List all borrowed books

## Tests

- All scenarios from the problem statement are covered
- Tests are written using Vitest
- The library is driven by tests and designed with testability in mind

To run tests:

```bash
npm run test
```
