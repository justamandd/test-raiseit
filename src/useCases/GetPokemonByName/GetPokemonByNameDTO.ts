import { BmiCategoryEnum } from "@entities/BmiCategoryEnum";

export interface GetPokemonByNameDTO {
  name: string;
  height: number;
  weight: number;
  bmi: number;
  category: BmiCategoryEnum;
}