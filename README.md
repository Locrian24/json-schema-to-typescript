# json-schema-to-typescript-with-deps [![Build Status][build]](https://github.com/bcherny/json-schema-to-typescript/actions?query=branch%3Amaster+workflow%3ACI) [![npm]](https://www.npmjs.com/package/json-schema-to-typescript) [![mit]](https://opensource.org/licenses/MIT) ![node]

[build]: https://img.shields.io/github/actions/workflow/status/bcherny/json-schema-to-typescript/ci.yml?style=flat-square
[npm]: https://img.shields.io/npm/v/json-schema-to-typescript.svg?style=flat-square
[mit]: https://img.shields.io/npm/l/json-schema-to-typescript.svg?style=flat-square
[node]: https://img.shields.io/badge/Node.js-16+-417e37?style=flat-square

> Compile JSON Schema to TypeScript typings.

> Note: This is a fork of `json-schema-to-typescript` whose intention is to support the use `dependencies` within JSON schemas. Right now the fork supports them when used in combination with `oneOf` and may not actually support other use-cases currently.

## Example

Check out the [live demo](https://borischerny.com/json-schema-to-typescript-browser/).

Input:

```json
{
  "title": "Example Schema",
  "type": "object",
  "properties": {
    "occupation": {
      "enum": ["farmer", "other"]
    },
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "age": {
      "description": "Age in years",
      "type": "integer",
      "minimum": 0
    },
    "hairColor": {
      "enum": ["black", "brown", "blue"],
      "type": "string"
    }
  },
  "dependencies": {
    "occupation": {
      "oneOf": [
        {
          "properties": {
            "occupation": {
              "enum": ["farmer"]
            }
          },
          {
            "required": ["jobDescription"],
            "properties": {
              "occupation": {
                "enum": ["other"]
              },
              "jobDescription": {
                "type": "string"
              }
            }
          }
        }
      ]
    }
  },
  "additionalProperties": false,
  "required": ["firstName", "lastName", "occupation"]
}
```

Output:

```ts
export type ExampleSchema = ExampleSchema1 & {
  firstName: string;
  lastName: string;
  occupation: "farmer" | "other"
  /**
   * Age in years
   */
  age?: number;
  hairColor?: "black" | "brown" | "blue";
}

export type ExampleSchema1 = 
  | {
      occupation?: "farmer"
    }
  | {
      occupation?: "other",
      jobDescription: string
    }
```

## Installation

```sh
npm install json-schema-to-typescript-with-deps
```

## Usage

json-schema-to-typescript is easy to use via the CLI, or programmatically.

### CLI

First make the CLI available using one of the following options:

```sh
# install locally, then use `npx json2ts`
npm install json-schema-to-typescript-with-deps

# or install globally, then use `json2ts`
npm install json-schema-to-typescript-with-deps --global

# or install to npm cache, then use `npx --package=json-schema-to-typescript-with-deps json2ts`
# (you don't need to run an install command first)
```

Then, use the CLI to convert JSON files to TypeScript typings:

```sh
cat foo.json | json2ts > foo.d.ts
# or
json2ts foo.json > foo.d.ts
# or
json2ts foo.yaml foo.d.ts
# or
json2ts --input foo.json --output foo.d.ts
# or
json2ts -i foo.json -o foo.d.ts
# or (quote globs so that your shell doesn't expand them)
json2ts -i 'schemas/**/*.json'
# or
json2ts -i schemas/ -o types/
```

You can pass any of the options described below (including style options) as CLI flags. Boolean values can be set to false using the `no-` prefix.

```sh
# generate code for definitions that aren't referenced
json2ts -i foo.json -o foo.d.ts --unreachableDefinitions
# use single quotes and disable trailing semicolons
json2ts -i foo.json -o foo.d.ts --style.singleQuote --no-style.semi
```

### API

See [the original repo](https://github.com/bcherny/json-schema-to-typescript) for more usage and API examples.