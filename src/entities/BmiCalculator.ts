import { BmiCategoryEnum } from "@entities/BmiCategoryEnum";

export class BmiCalculator {
  public calculate(height: number, weight: number): number {
    return weight / Math.pow(height, 2);
  }

  public getCategory(bmi: number): BmiCategoryEnum {
   if (bmi < 10) {
    return BmiCategoryEnum.LEVE;
   } else if (bmi >= 10 && bmi < 20) {
    return BmiCategoryEnum.MEDIO;
   } else {
    return BmiCategoryEnum.PESADO;
   }
  }
}