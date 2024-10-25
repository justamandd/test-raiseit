import { BmiCategoryEnum } from "@entities/BmiCategoryEnum";


export class BmiClassifier {
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