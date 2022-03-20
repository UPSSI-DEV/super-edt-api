import { Request, Response, NextFunction } from "express";

// Methods

class ErrorHandler extends Error {
  public json: object;

  constructor(public statusCode: number, public message: string) {
    super();
    this.json = {
      status: "error",
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

function errorMiddleware(
  err: Error | ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let error = err;
  if (!(err instanceof ErrorHandler))
    error = new ErrorHandler(500, "Unexpected error");
  const cError = <ErrorHandler>error;

  console.log(
    "\x1b[31m" + `↓ ${cError.statusCode}: ${cError.message}` + "\x1b[0m"
  );
  res.status(cError.statusCode).json(cError.json);
}

function error404(req: Request, res: Response) {
  const route = req.originalUrl.split("?").shift();
  throw new ErrorHandler(404, `Route '${route}' does not exist !`);
}

// Exports

export default ErrorHandler;
export { error404, errorMiddleware };
