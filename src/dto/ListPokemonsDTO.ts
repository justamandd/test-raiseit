import { BmiCategoryEnum } from "@enums/BmiCategoryEnum";

export interface ListPokemonsDTO {
  name: string;
  height: number;
  weight: number;
  bmi: number;
  category: BmiCategoryEnum;
}