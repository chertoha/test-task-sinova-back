import {
 Controller,
 FileTypeValidator,
 MaxFileSizeValidator,
 ParseFilePipe,
 Post,
 UploadedFile,
 UseInterceptors,
} from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { IMAGE_ALLOWED_MIME_TYPES, IMAGE_MAX_SIZE } from "src/utils/constants";

@Controller("files")
@ApiTags("Files")
export class FilesController {
 constructor(private readonly filesService: FilesService) {}

 @Post("image")
 @UseInterceptors(FileInterceptor("file"))
 async uploadImage(
  @UploadedFile(
   new ParseFilePipe({
    validators: [
     new MaxFileSizeValidator({ maxSize: IMAGE_MAX_SIZE }),
     new FileTypeValidator({ fileType: IMAGE_ALLOWED_MIME_TYPES }),
    ],
   }),
  )
  file: Express.Multer.File,
 ) {
  return await this.filesService.saveImage(file);
 }
}
