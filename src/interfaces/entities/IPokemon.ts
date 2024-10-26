import { BmiCategoryEnum } from "@enums/BmiCategoryEnum";

export interface IPokemon {
  name: string;
  height: number;
  weight: number;
  bmi?: number;
  category?: BmiCategoryEnum;
}