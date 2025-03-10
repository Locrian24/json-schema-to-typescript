import {writeFileSync} from 'fs'
import {compileFromFile} from 'json-schema-to-typescript'

async function generate() {
  writeFileSync(
    'person.d.ts',
    await compileFromFile('person.json', {
      additionalProperties: false,
      unreachableDefinitions: true,
    }),
  )
}

generate()
