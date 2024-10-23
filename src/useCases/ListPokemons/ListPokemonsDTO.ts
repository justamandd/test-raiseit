import { BmiCategoryEnum } from "@entities/BmiCategoryEnum";

export interface ListPokemonsDTO {
  name: string;
  height: number;
  weight: number;
  bmi: number;
  category: BmiCategoryEnum;
}