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
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IMAGE_ALLOWED_MIME_TYPES, IMAGE_MAX_SIZE } from "src/utils/constants";

@Controller("files")
@ApiTags("Files")
export class FilesController {
 constructor(private readonly filesService: FilesService) {}

 @Post("image")
 @ApiOperation({ summary: "Upload image" })
 @ApiConsumes("multipart/form-data")
 @ApiBody({
  schema: {
   type: "object",
   properties: {
    file: {
     type: "string",
     format: "binary",
    },
   },
  },
 })
 @ApiResponse({
  status: 200,
  description: "Image uploaded successfully",
  schema: {
   type: "object",
   properties: {
    src: {
     type: "string",
     example: "/your-image.jpg",
    },
   },
  },
 })
 @ApiResponse({ status: 400, description: "Bad request (validation failed) " })
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
