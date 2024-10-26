import { WeightConverter } from "@utils/WeightConverter";

describe("WeightConverter", () => {
  let weightConverter: WeightConverter;

  beforeEach(()=> {
    weightConverter = new WeightConverter();
  })

  it('should convert weigth from hectograms to kilos', () => {
    expect(weightConverter.convertWeightFromHectogramToKilos(180)).toBe(18);
  })
})
