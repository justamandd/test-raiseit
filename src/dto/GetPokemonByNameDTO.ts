import { BmiCategoryEnum } from "@enums/BmiCategoryEnum";

export interface GetPokemonByNameDTO {
  name: string;
  height: number;
  weight: number;
  bmi: number;
  category: BmiCategoryEnum;
}