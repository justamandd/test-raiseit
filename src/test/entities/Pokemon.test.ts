import { BmiCalculator } from "@entities/BmiCalculator";
import { BmiCategoryEnum } from "@entities/BmiCategoryEnum";
import { Pokemon } from "@entities/Pokemon";

const mockBmiCalculator: BmiCalculator = {
  calculate: jest.fn((height: number, weight: number) => 0.01),
  getCategory: jest.fn((bmi: number) => BmiCategoryEnum.LEVE)
}

describe('Pokemon Class', () => {

  it('should calculate bmi and get the bmi category on class instantiation', () => {
    new Pokemon({ name: 'Pikachu', height: 4, weight: 60, bmiCalculator: mockBmiCalculator });

    expect(mockBmiCalculator.calculate).toHaveBeenCalledWith(0.4, 6);
    expect(mockBmiCalculator.getCategory).toHaveBeenCalledWith(0.01);
  });
})