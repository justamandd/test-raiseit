import { BmiCalculator } from "@utils/BmiCalculator";

describe("BmiCalculator", () => {
  let bmiCalculator: BmiCalculator;

  beforeEach(()=> {
    bmiCalculator = new BmiCalculator();
  })

  it('should calculate bmi', () => {
    expect(bmiCalculator.calculate(1.8, 80)).toBe(24.69);
  })
})