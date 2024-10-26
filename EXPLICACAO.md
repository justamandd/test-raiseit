Para visualizar documentação feita em LaTeX, como a conversão de medidas leia fora do GitHub.

# Como a API foi desenvolvida

## Descrição Geral

A API de visualização de Pokemons foi desenvolvida para fornecer informações detalhadas sobre diferentes Pokemons. Ela permite buscar todos os Pokemons ou um único pelo seu nome, sendo possível obter informações como Nome, Peso, Altura, IMC e classificação do IMC. A API foi projetada para ser flexível e seguir boas práticas de desenvolvimento.

## Arquitetura e Design

A API segue o padrão RESTful, utilizando o padrão DDD (arquitetura orientada ao domínio) para organizar o código. O design foi desenvolvido com base nos princípios SOLID, garantindo modularidade e facilidade de manutenção. A lógica de negócio foi separada em casos de uso, e a lógica de acesso a dados foi abstraída em serviços. As validações foram colocadas como utilitários, e as fábricas foram utilizadas para a criação do objeto Pokemon, a todo momento seguindo o princípio da inversão de dependências.

## Ferramentas e Tecnologias Utilizadas

A API foi desenvolvida em TypeScript utilizando o framework Express para lidar com as requisições HTTP. O Axios foi utilizado para consumir dados externos de uma API pública (PokeAPI). Para validações, utilizei utilitários personalizados e a arquitetura da API foi orientada a casos de uso. O Postman foi utilizado para testes manuais, e o Jest para testes unitários. Por fim, para a documentação da API foi utilizado o SwaggerAPI

A documentação feita com Swagger pode ser encontrada ao rodar o projeto e entrar na rota /api-docs:
Exemplo:
``` curl
http://localhost:3000/api-docs
```

## Princípios de Design Seguidos

A API foi desenvolvida seguindo os princípios do SOLID. 

O Princípio da Responsabilidade Única (SRP) foi aplicado ao separar claramente as responsabilidades entre controladores, serviços e entidades. 

Aqui podemos ver que a única responsabilidade do controlador é mediar a interface do usuário e a lógica de negócios:

``` Typescript
import { Request, Response } from "express";
import { GetPokemonByNameUseCase } from "@useCases/GetPokemonByNameUseCase";

export class GetPokemonByNameController {
  constructor(
    private getPokemonByNameUseCase: GetPokemonByNameUseCase
  ){}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.params;

    try {
      const pokemon = await this.getPokemonByNameUseCase.execute(name as string);

      return res.status(200).json(pokemon);
    } catch (err) {
      const error = err as Error;

      return res.status(400).json({
        message: error.message
      });
    }
  }
}
```

O Princípio Aberto/Fechado (OCP) também foi respeitado, da maneira que o projeto está estruturado, se quisermos extendermos (criar novas funcionalidades) conseguimos sem ter que alterar o código já existente.

O Princípio de Substituição de Liskov é contemplado, mediante a criação de interfaces que definem um contrato com as classes que as implementam, por exemplo, se precisarmos em algum momento mudar a fonte dos dados, não quebraremos o sistema, visto que o método continua o mesmo, porém, com a lógica diferente.

O Princípio de Segregação de Interface é implementado de maneira que nenhuma classe tenha que implementar métodos desnecessários.

O Princípio de Inversão de Dependências é respeitado, visto que todas dependencias que minhas classes tem, são injetadas através do método construtor, não implementadas de forma concreta.

``` Typescript
const bmiCalculator = new BmiCalculator();
const bmiClassifier = new BmiClassifier();
const weightConverter = new WeightConverter();
const heightConverter = new HeightConverter();

const pokemonFactory = new PokemonFactory(bmiCalculator, bmiClassifier, weightConverter, heightConverter);

const getPokemonByNameService = new GetPokemonByNameService(
  process.env.POKEAPI_URL!, 
  process.env.POKEAPI_FIND_ROUTE!, 
  pokemonFactory
);

const getPokemonByNameUseCase = new GetPokemonByNameUseCase(getPokemonByNameService);
const getPokemonByNameController = new GetPokemonByNameController(getPokemonByNameUseCase);
```

## Processo de Desenvolvimento

O desenvolvimento da API seguiu uma abordagem iterativa. A cada iteração era definido o caso de uso principal, seu serviço, controlador e testes unitários.

## Testes

A API foi testada utilizando Jest para garantir a estabilidade e qualidade do código. Testes unitários cobrem os principais componentes da API, como serviços, caso de uso, controladores e utilitários.

## Documentação e Ferramentas

A API foi documentada usando Swagger, permitindo que os desenvolvedores explorem os endpoins. A documentação também foi exportada do Postman.

# Como foram feitas as conversões de medidas

Para cada conversão foi criada uma classe utilitária única, visando o Princípio da Responsabilidade Única (SRP), sendo exportada com um método de conversão de medida.

As conversões foram realizadas mediante as seguintes formulas:

Hectogramas para Kilogramas:
$ KG = \frac{Hectogramas}{10}$

``` Typescript
export class WeightConverter {
  public convertWeightFromHectogramToKilos(weight: number): number {
    return weight / 10;
  }
}
```


Decímetros para Metros:
$ M = \frac{Decímetros}{10}$

``` Typescript
export class HeightConverter {
  public convertHeightFromDecimetersToMeters(height: number): number {
    return height / 10;
  }
}
```


# Como foi feito o cálculo do IMC

O cálculo do IMC foi feito em uma classe utilitária única, visando o Princípio da Responsabilidade Única (SRP), exportada com um método que realiza o cálculo.

O cálculo foi realizado mediante a formula abaixo:

$ IMC = \frac{Peso}{Altura^2}$

``` Typescript
export class BmiCalculator {
  public calculate(height: number, weight: number): number {
    return parseFloat((weight / Math.pow(height, 2)).toFixed(2));
  }
}
```

A criação de um utilitário único também foi realizado para a classificação do IMC.

``` Typescript
import { BmiCategoryEnum } from "@enums/BmiCategoryEnum";

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
```

# Quais foram os principais desafios encontrados

Os meus principais desafios foram:

- Aplicar os Princípios do SOLID
  
  Como é algo que estou aprendendo muito na prática, a princípio deixei algumas responsabilidades a mais em algumas camadas, porém, revisando o código posteriormente, pude enxergar o que havia colocado a mais e separar.

- Testes unitários

  A criação dos testes em sí é fácil, porém, pensar no que testar é algo mais complexo.

