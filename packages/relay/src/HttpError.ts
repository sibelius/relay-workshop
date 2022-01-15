export class HttpError extends Error {
  constructor(message: string, public readonly response: Response) {
    super(message);
  }
}
