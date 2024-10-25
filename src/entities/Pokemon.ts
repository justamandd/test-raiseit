import { BmiCategoryEnum } from "@entities/BmiCategoryEnum";
import { BmiCalculator } from "@entities/BmiCalculator";
import { BmiClassifier } from "./BmiClassifier";
import { WeightConverter } from "./WeightConverter";
import { HeightConverter } from "./HeightConverter";

export class Pokemon{
  name: string;
  height: number;
  weight: number;
  bmiCalculator: BmiCalculator;
  bmiClassifier: BmiClassifier;
  weightConverter: WeightConverter;
  heightConverter: HeightConverter;
  bmi?: number | undefined;
  category?: BmiCategoryEnum | undefined;

  public constructor(props: Omit<Pokemon, 'bmi' | 'category'>, bmi?: number, category?: BmiCategoryEnum) {
    this.name = props.name;
    this.heightConverter = props.heightConverter;
    this.weightConverter = props.weightConverter;
    this.height = this.heightConverter.convertHeightFromDecimetersToMeters(props.height);
    this.weight = this.weightConverter.convertWeightFromHectogramToKilos(props.weight);
    this.bmiCalculator = props.bmiCalculator;
    this.bmiClassifier = props.bmiClassifier;

    if (bmi && category) {
      Object.assign(this, { bmi, category });
    }

    else {
      this.bmi = this.bmiCalculator.calculate(this.height, this.weight);
      this.category = this.bmiClassifier.getCategory(this.bmi);
    }
  }
}