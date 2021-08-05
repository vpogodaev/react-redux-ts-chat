export class HttpError extends Error {
  constructor(code: number, msg: string) {
    super(msg);
    this.code = code;
  }

  code: number;
}
