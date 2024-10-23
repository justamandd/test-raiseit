import { BmiCalculator } from "@entities/BmiCalculator";

describe("BmiCalculator", () => {
  let bmiCalculator: BmiCalculator;

  beforeEach(()=> {
    bmiCalculator = new BmiCalculator();
  })

  it('should calculate bmi', () => {
    expect(bmiCalculator.calculate(1.8, 80)).toBe(24.69);
  })

  it('should return leve category', () => {
    expect(bmiCalculator.getCategory(9)).toBe('Leve');
  })
})