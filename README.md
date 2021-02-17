** NOT MAINTAINED -- PLEASE DO NOT USE **

(for more context, see https://github.com/signaux-faibles/opensignauxfaibles/pull/317/#discussion_r576335509)

# mongodb-json-schema-to-typescript

Transform MongoDB-compliant JSON Schema files to TypeScript.

On top of [`json-schema-to-typescript`](https://github.com/bcherny/json-schema-to-typescript), it supports `bsonType` values, including `date`.

This fork also supports some `bsonType` types: `Date` or fallback to usual values for `type`.

## Example

Input:
```json
{
  "title": "Example Schema",
  "bsonType": "object",
  "properties": {
    "name": {
      "bsonType": "string"
    },
    "subscriptionDate": {
      "bsonType": "date"
    },
    "age": {
      "description": "Age in years",
      "bsonType": "integer",
      "minimum": 0
    },
    "hairColor": {
      "enum": ["black", "brown", "blue"],
      "bsonType": "string"
    }
  },
  "additionalProperties": false,
  "required": ["name", "subscriptionDate"]
}
```

Output:
```ts
export interface ExampleSchema {
  name: string;
  subscriptionDate: Date;
  /**
   * Age in years
   */
  age?: number;
  hairColor?: "black" | "brown" | "blue";
}
```

## CLI

A CLI utility is provided with this package.

```sh
npx mongodb-json-schema-to-typescript foo.json > foo.d.ts
```

## Tests

`npm test`

## Features

- [x] `title` => `interface`
- [x] Primitive types:
  - [x] array
  - [x] homogeneous array
  - [x] boolean
  - [x] integer
  - [x] number
  - [x] null
  - [x] object
  - [x] string
  - [x] homogeneous enum
  - [x] heterogeneous enum
- [x] Non/extensible interfaces
- [ ] Custom JSON-schema extensions
- [x] Nested properties
- [x] Schema definitions
- [x] [Schema references](http://json-schema.org/latest/json-schema-core.html#rfc.section.7.2.2)
- [x] Local (filesystem) schema references
- [x] External (network) schema references
- [x] Add support for running in browser
- [x] default interface name
- [x] infer unnamed interface name from filename
- [x] `allOf` ("intersection")
- [x] `anyOf` ("union")
- [x] `oneOf` (treated like `anyOf`)
- [x] `maxItems` ([eg](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L166))
- [x] `minItems` ([eg](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L165))
- [x] `additionalProperties` of type
- [x] `patternProperties` (partial support)
- [x] [`extends`](https://github.com/json-schema/json-schema/wiki/Extends/014e3cd8692250baad70c361dd81f6119ad0f696)
- [x] `required` properties on objects ([eg](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L130))
- [ ] `validateRequired` ([eg](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L124))
- [x] literal objects in enum ([eg](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L236))
- [x] referencing schema by id ([eg](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L331))
- [x] custom typescript types via `tsType`

## Custom schema properties:

- `tsType`: Overrides the type that's generated from the schema. Useful for forcing a type to `any` or when using non-standard JSON schema extensions ([eg](https://github.com/sokra/json-schema-to-typescript/blob/f1f40307cf5efa328522bb1c9ae0b0d9e5f367aa/test/e2e/customType.ts)).
- `tsEnumNames`: Overrides the names used for the elements in an enum. Can also be used to create string enums ([eg](https://github.com/johnbillion/wp-json-schemas/blob/647440573e4a675f15880c95fcca513fdf7a2077/schemas/properties/post-status-name.json)).

## Not expressible in TypeScript:

- `dependencies` ([single](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L261), [multiple](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L282))
- `divisibleBy` ([eg](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L185))
- [`format`](https://github.com/json-schema/json-schema/wiki/Format) ([eg](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L209))
- `multipleOf` ([eg](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L186))
- `maximum` ([eg](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L183))
- `minimum` ([eg](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L182))
- `maxProperties` ([eg](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L113))
- `minProperties` ([eg](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L112))
- `not`/`disallow`
- `oneOf` ("xor", use `anyOf` instead)
- `pattern` ([string](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L203), [regex](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L207))
- `uniqueItems` ([eg](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L172))

## FAQ

### JSON-Schema-to-TypeScript is crashing on my giant file. What can I do?

Prettier is known to run slowly on really big files. To skip formatting and improve performance, set the `format` option to `false`.

## Further Reading

- Original implementation: https://github.com/bcherny/json-schema-to-typescript
- JSON-schema spec: https://tools.ietf.org/html/draft-zyp-json-schema-04
- JSON-schema wiki: https://github.com/json-schema/json-schema/wiki
- JSON-schema test suite: https://github.com/json-schema/JSON-Schema-Test-Suite/blob/node
- TypeScript spec: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md
