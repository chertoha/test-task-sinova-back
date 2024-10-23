import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";

@Controller("files")
@ApiTags("Files")
export class FilesController {
 constructor(private readonly filesService: FilesService) {}

 @Post("image")
 @UseInterceptors(FileInterceptor("file"))
 async uploadImage(@UploadedFile() file: Express.Multer.File) {
  return await this.filesService.saveImage(file);
 }
}
