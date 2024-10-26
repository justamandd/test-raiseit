import { BmiCategoryEnum } from "@enums/BmiCategoryEnum";
import { BmiCalculator } from "@utils/BmiCalculator";
import { BmiClassifier } from "@utils/BmiClassifier";
import { WeightConverter } from "../utils/WeightConverter";
import { HeightConverter } from "../utils/HeightConverter";
import { IPokemon } from "@interfaces/entities/IPokemon";

export class Pokemon implements IPokemon {
  name: string;
  height: number;
  weight: number;
  bmi?: number | undefined;
  category?: BmiCategoryEnum | undefined;

  bmiCalculator: BmiCalculator;
  bmiClassifier: BmiClassifier;
  weightConverter: WeightConverter;
  heightConverter: HeightConverter;

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