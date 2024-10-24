import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { MongoError } from "mongodb";

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
 catch(exception: MongoError, host: ArgumentsHost) {
  const ctx = host.switchToHttp();
  const response = ctx.getResponse<Response>();

  switch (exception.code) {
   case 11000:
    response.status(HttpStatus.CONFLICT).json({
     statusCode: HttpStatus.CONFLICT,
     errorMessage: `Duplicate error: ${exception.errmsg}`,
    });
    break;

   default:
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
     statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
     errorMessage: `Internal Error`,
    });
  }
 }
}
