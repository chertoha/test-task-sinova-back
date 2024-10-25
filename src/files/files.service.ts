import * as fs from "fs/promises";
import { Injectable } from "@nestjs/common";
import { join, resolve } from "path";
import { PUBLIC_FOLDER_NAME, UPLOADS_FOLDER_NAME } from "src/utils/constants";

const publicFolder = resolve(PUBLIC_FOLDER_NAME);

@Injectable()
export class FilesService {
 async saveImage(file: Express.Multer.File) {
  const { path: oldPath, filename } = file;
  const newPath = join(publicFolder, UPLOADS_FOLDER_NAME, filename);

  await fs.rename(oldPath, newPath);

  return { src: filename };
 }
}
