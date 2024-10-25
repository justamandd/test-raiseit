import { BmiCalculator } from "@entities/BmiCalculator";
import { BmiCategoryEnum } from "@entities/BmiCategoryEnum";
import { BmiClassifier } from "@entities/BmiClassifier";
import { HeightConverter } from "@entities/HeightConverter";
import { Pokemon } from "@entities/Pokemon";
import { WeightConverter } from "@entities/WeightConverter";

const mockBmiCalculator: BmiCalculator = {
  calculate: jest.fn((height: number, weight: number) => 0.01)
}


describe('Pokemon Class', () => {
  const bmiCalculator = new BmiCalculator();
  const bmiClassifier = new BmiClassifier();
  const heightConverter = new HeightConverter();
  const weightConverter = new WeightConverter();


  it('should calculate bmi and get the bmi category on class instantiation', () => {
    const pokemon = new Pokemon({ name: 'Pikachu', height: 4, weight: 60, bmiCalculator, bmiClassifier, heightConverter, weightConverter });

    expect(pokemon.height).toBe(0.4);
    expect(pokemon.weight).toBe(6);
    expect(pokemon.bmi).toBe(37.5);
    expect(pokemon.category).toBe(BmiCategoryEnum.PESADO);
  });
})