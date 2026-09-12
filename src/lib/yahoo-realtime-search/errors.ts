export class YahooSearchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "YahooSearchError";
  }
}
