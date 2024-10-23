import { Injectable } from "@nestjs/common";

@Injectable()
export class FilesService {
 async saveImage(file: Express.Multer.File) {
  console.log(file);

  return { src: "http file src" };
 }
}
