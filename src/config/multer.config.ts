import { MulterModuleOptions } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { resolve } from "path";

export const multerConfig: MulterModuleOptions = {
 storage: diskStorage({
  destination: resolve("temp"),

  filename(_req, file, callback) {
   const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
   callback(null, `${uniquePrefix}_${file.originalname}`);
  },
 }),
};
