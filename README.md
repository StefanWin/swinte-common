# `@stefanwin/common`

### Usage
- `pnpm set registry https://registry.npmjs.org/`
- `pnpm set @stefanwin:registry https://npm.pkg.github.com`

### Overview

- `src/extract-error-message.ts`
  - `extractErrorMessage(err: unknown): string | undefined`
  - extracts the `message` property from the given value
    - if `err` is a `string`, returns the string
    - if `err` is an `Error`, returns `err.message`
    - if `err` is an `object`, returns `err.message` if `err.message` is a `string`
    - otherwise, returns `undefined`
- `src/try-catch.ts`
  - `function tryCatch<T, E = Error>(fn: Promise<T>): Promise<Result<T, E>>`
  - taken from here: https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b 
