import {
 PipeTransform,
 Injectable,
 ArgumentMetadata,
 HttpException,
 HttpStatus,
} from "@nestjs/common";
import { UpdatePostDto } from "src/posts/dto/update-post.dto";

@Injectable()
export class EmptyBodyValidationPipe implements PipeTransform {
 transform(body: object, _metadata: ArgumentMetadata) {
  if (Object.keys(body).length === 0) {
   throw new HttpException("Empty body", HttpStatus.BAD_REQUEST);
  }
  return body;
 }
}
