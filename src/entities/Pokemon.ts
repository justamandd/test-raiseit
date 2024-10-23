import { BmiCategoryEnum } from "@entities/BmiCategoryEnum";
import { BmiCalculator } from "@entities/BmiCalculator";

export class Pokemon{
  name: string;
  height: number;
  weight: number;
  bmi?: number | undefined;
  category?: BmiCategoryEnum | undefined;
  bmiCalculator: BmiCalculator;

  public constructor(props: Omit<Pokemon, 'bmi' | 'category'>, bmi?: number, category?: BmiCategoryEnum) {
    this.name = props.name;
    this.height = this.convertHeightFromDecimetersToMeters(props.height);
    this.weight = this.convertWeightFromHectogramToKilos(props.weight);
    this.bmiCalculator = props.bmiCalculator;

    if (bmi && category) {
      Object.assign(this, { bmi, category });
    }

    else {
      this.bmi = this.bmiCalculator.calculate(this.height, this.weight);
      this.category = this.bmiCalculator.getCategory(this.bmi);
    }
  }

  private convertWeightFromHectogramToKilos(weight: number): number {
    return weight / 10;
  }

  private convertHeightFromDecimetersToMeters(height: number): number {
    return height / 10;
  }
}