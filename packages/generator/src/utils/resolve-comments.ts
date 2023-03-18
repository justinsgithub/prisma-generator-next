import type { DMMF } from '@prisma/generator-helper'

// Thanks to prisma-zod-generator
export function resolveModelsComments(models: DMMF.Model[]): string[] {
  const hiddenModels: string[] = []
  const modelAttributeRegex = /(@@Gen\.)+([A-z])+(\()+(.+)+(\))+/
  const attributeNameRegex = /(?:\.)+([A-Za-z])+(?:\()+/
  const attributeArgsRegex = /(?:\()+([A-Za-z])+\:+(.+)+(?:\))+/

  for (const model of models) {
    if (model.documentation) {
      const attribute = model.documentation?.match(modelAttributeRegex)?.[0]
      const attributeName = attribute?.match(attributeNameRegex)?.[0]?.slice(1, -1)
      if (attributeName !== 'model') continue
      const rawAttributeArgs = attribute?.match(attributeArgsRegex)?.[0]?.slice(1, -1)

      const parsedAttributeArgs: Record<string, unknown> = {}
      if (rawAttributeArgs) {
        const rawAttributeArgsParts = rawAttributeArgs
          .split(':')
          .map((it) => it.trim())
          .map((part) => (part.startsWith('[') ? part : part.split(',')))
          .flat()
          .map((it) => it.trim())

        for (let i = 0; i < rawAttributeArgsParts.length; i += 2) {
          const key = rawAttributeArgsParts[i]
          const value = rawAttributeArgsParts[i + 1]
          parsedAttributeArgs[key] = JSON.parse(value)
        }
      }
      if (parsedAttributeArgs.hide) {
        hiddenModels.push(model.name)
      }
    }
  }

  return hiddenModels
}
