import { HeightConverter } from "@utils/HeightConverter";

describe("HeightConverter", () => {
  let heightConverter: HeightConverter;

  beforeEach(()=> {
    heightConverter = new HeightConverter();
  })

  it('should convert height from decimeters to meters', () => {
    expect(heightConverter.convertHeightFromDecimetersToMeters(180)).toBe(18);
  })

})