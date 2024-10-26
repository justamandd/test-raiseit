export class IsAlpha {
  static validate(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str);
  }
}