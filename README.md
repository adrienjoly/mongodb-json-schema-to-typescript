# mongodb-json-schema-to-typescript

Transform MongoDB-compliant JSON Schema files to TypeScript.

On top of [`json-schema-to-typescript`](https://github.com/bcherny/json-schema-to-typescript), it supports `bsonType` values, including `date`.

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

## Further Reading

- Original implementation: https://github.com/bcherny/json-schema-to-typescript
- JSON-schema spec: https://tools.ietf.org/html/draft-zyp-json-schema-04
- JSON-schema wiki: https://github.com/json-schema/json-schema/wiki
- JSON-schema test suite: https://github.com/json-schema/JSON-Schema-Test-Suite/blob/node
- TypeScript spec: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md
