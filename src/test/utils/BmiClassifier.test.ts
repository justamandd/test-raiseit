import { BmiClassifier } from "@utils/BmiClassifier";


describe("BmiCalculator", () => {
  let bmiClassifier: BmiClassifier;

  beforeEach(()=> {
    bmiClassifier = new BmiClassifier();
  })

  it('should return leve category', () => {
    expect(bmiClassifier.getCategory(9)).toBe('Leve');
  })
})