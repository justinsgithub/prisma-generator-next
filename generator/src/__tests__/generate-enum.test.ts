/* import { genEnum } from '../helpers/genEnum' */
import { getSampleDMMF } from './__fixtures__/getSampleDMMF'

test('enum generation', async () => {
  const sampleDMMF = await getSampleDMMF()

  sampleDMMF.datamodel.enums.forEach((_enumInfo) => {
    /* expect(genEnum(enumInfo)).toMatchSnapshot(enumInfo.name) */
  })
})
