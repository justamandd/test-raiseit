export class BmiCalculator {
  public calculate(height: number, weight: number): number {
    return parseFloat((weight / Math.pow(height, 2)).toFixed(2));
  }
}