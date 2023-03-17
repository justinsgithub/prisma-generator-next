import { writeFile } from 'fs/promises'

import { GeneratorOptions } from '@prisma/generator-helper'

// for generator development to inspect generator helper output
export async function generateJson (options: GeneratorOptions) {

  await writeFile('prisma/dmmf.json', JSON.stringify(options.dmmf))

  await writeFile('prisma/datamodel.json', JSON.stringify(options.datamodel))

  await writeFile('prisma/generator.json', JSON.stringify(options.generator))

  await writeFile('prisma/other-generators.json', JSON.stringify(options.otherGenerators))

  await writeFile('prisma/datasources.json', JSON.stringify(options.datasources))

  await writeFile('prisma/dmmf-mappings.json', JSON.stringify(options.dmmf.mappings))

  await writeFile('prisma/dmmf-schema.json', JSON.stringify(options.dmmf.schema))

  await writeFile('prisma/dmmf-datamodel.json', JSON.stringify(options.dmmf.datamodel))

  await writeFile('prisma/dmmf-datamodel-types.json', JSON.stringify(options.dmmf.datamodel.types))

  await writeFile('prisma/dmmf-datamodel-enums.json', JSON.stringify(options.dmmf.datamodel.enums))

  await writeFile('prisma/dmmf-datamodel-models.json', JSON.stringify(options.dmmf.datamodel.models))
}

