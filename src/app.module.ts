import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';

@Module({
 imports: [
  ConfigModule.forRoot({ isGlobal: true }),
  MongooseModule.forRoot(process.env.DB_HOST),
  PostsModule,
 ],
 controllers: [],
 providers: [],
})
export class AppModule {}
