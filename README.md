<p align="center">
  <h3 align="center">Prisma Next.JS Generator</h3>
  <p align="center">
    Automatically generate API routes with middleware and Zod from your Prisma schema.
  </p>
</p>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Customizations](#customizations)
- [Additional Options](#additional-options)

This package assumes you have project initialized with Prisma, Next.JS 

This package works best with a few dependencies to validate api-routes and keep code DRY


Using pnpm:

```bash
 pnpm add -D prisma-zod-generator && pnpm add next-api-middleware zod superjson
```

Using yarn:

```bash
 yarn add -D prisma-zod-generator && yarn add next-api-middleware zod superjson
```

Using npm:

```bash
 npm install -D prisma-zod-generator && npm install next-api-middleware zod superjson
```

# Usage

1. Add the generator to your Prisma schema

```prisma
generator zod {
  provider = "prisma-zod-generator"
}
```

2. Enable strict mode in `tsconfig` as it is required by Zod, and considered a Typescript best practice

```ts
{
  "compilerOptions": {
    "strict": true
  }
}

```

3. Run `npx prisma generate` 

If your prisma.schema looked like this...

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String
  content   String?
  published Boolean  @default(false)
  viewCount Int      @default(0)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
  likes     BigInt
}
```

...it will generate the following files



4. edit the generated files as needed

WARNING: certain files should be thought of as "read-only", as they will be regenerated every time `prisma generate` is ran. Any changes to the "read-only" files would be lost, files clarify if they are okay to modify at the top. 

```ts
import { PostCreateOneSchema } from './prisma/generated/schemas/createOnePost.schema';

app.post('/blog', async (req, res, next) => {
  const { body } = req;
  await PostCreateOneSchema.parse(body);
});
```

# Customizations

You can add options to your prisma.schema to customize generator output

Please feel free to submit an issue if you have a good idea for any new customizations or features to be added.

## Skipping entire models

```prisma
/// @@Gen.model(hide: true)
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

## Additional Options

The output option is relative to the prisma.schema file, so the default `./generated` would output to `prisma/generated` (unless you have your schema file in a custom location)

| Option              | Description                                                                | Type      | Default       |
| ------------------- | -------------------------------------------------------------------------- | --------- | ------------- |
| `output`            | Output directory for the generated zod schemas                             | `string`  | `./generated` |
| `isGenerateSelect`  | Enables the generation of Select related schemas and the select property   | `boolean` | `true`       |
| `isGenerateInclude` | Enables the generation of Include related schemas and the include property | `boolean` | `true`       |

Use additional options in the `schema.prisma`

```prisma
generator zod {
  provider          = "prisma-zod-generator"
  output            = "./generated-zod-schemas"
  isGenerateSelect  = true
  isGenerateInclude = true
}
```
