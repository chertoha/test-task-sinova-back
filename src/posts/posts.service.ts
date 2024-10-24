import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Post } from "./schemas/post.schema";
import { Model, ProjectionType, QueryOptions, RootFilterQuery } from "mongoose";
import { GetPostsQueryDto } from "./dto/get-posts-query.dto";
import { PageableDto } from "src/common/dto/pageable.dto";

@Injectable()
export class PostsService {
 constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

 async create(createPostDto: CreatePostDto) {
  const post = await this.postModel.create(createPostDto);
  return post;
 }

 async findAll(queryDto: GetPostsQueryDto) {
  console.log(queryDto);
  const { skip, limit } = queryDto;

  const filter: RootFilterQuery<Post> = {};
  const projection: ProjectionType<Post> = { __v: 0 };
  const options: QueryOptions = { skip, limit };

  const posts = await this.postModel.find(filter, projection, options);
  const totalElements = await this.postModel.countDocuments(filter);

  return new PageableDto<Post>(posts, { totalElements, options: queryDto });
 }

 async findOne(id: string) {
  const filter: RootFilterQuery<Post> = { _id: id };
  const projection: ProjectionType<Post> = { __v: 0 };
  const options: QueryOptions = {};

  const post = await this.postModel.findOne(filter, projection, options);

  if (!post) {
   throw new HttpException(`Post with ID=${id} not found`, HttpStatus.NOT_FOUND);
  }

  return post;
 }

 async update(id: string, updatePostDto: UpdatePostDto) {
  const post = await this.postModel.findOneAndUpdate({ _id: id }, updatePostDto, { new: true });

  if (!post) {
   throw new HttpException(`Post with ID=${id} not found`, HttpStatus.NOT_FOUND);
  }

  return post;
 }

 async remove(id: string) {
  const post = await this.postModel.findOneAndDelete({ _id: id });

  if (!post) {
   throw new HttpException(`Post with ID=${id} not found`, HttpStatus.NOT_FOUND);
  }
  return post;
 }
}
