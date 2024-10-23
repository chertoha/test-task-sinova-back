import {
 PipeTransform,
 Injectable,
 ArgumentMetadata,
 HttpException,
 HttpStatus,
} from "@nestjs/common";
import { isValidObjectId } from "mongoose";

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
 transform(value: any, _metadata: ArgumentMetadata) {
  if (!isValidObjectId(value)) {
   throw new HttpException("Invalid ID format", HttpStatus.BAD_REQUEST);
  }
  return value;
 }
}
