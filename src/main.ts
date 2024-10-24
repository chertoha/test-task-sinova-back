import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { MongoExceptionFilter } from "./filters/mongo-exception.filter";

async function bootstrap() {
 const app = await NestFactory.create(AppModule);

 app.enableCors();
 app.setGlobalPrefix("api");

 const config = new DocumentBuilder()
  .setTitle("Test task Sinova API")
  .setDescription("The posts API description")
  .setVersion("1.0")
  .addTag("Post service documentation")
  .build();
 const documentFactory = () => SwaggerModule.createDocument(app, config);
 SwaggerModule.setup("api", app, documentFactory);

 app.useGlobalPipes(new ValidationPipe({ transform: true }));
 app.useGlobalFilters(new MongoExceptionFilter());

 const PORT = process.env.PORT ?? 9090;
 await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
