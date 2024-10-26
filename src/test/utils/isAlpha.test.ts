import { IsAlpha } from "@utils/IsAlpha";

describe("IsAlpha", () => {

  it('should return true', () => {
    expect(IsAlpha.validate('abc')).toBe(true);
  })

  it('should return false', () => {
    expect(IsAlpha.validate('abc1')).toBe(false);
  })
})