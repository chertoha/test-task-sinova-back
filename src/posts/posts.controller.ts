import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PostResponseDto } from "./dto/post-response.dto";
import { GetPostsQueryDto } from "./dto/get-posts-query.dto";
import { PageableDto } from "src/common/dto/pageable.dto";
import { Post as PostModel } from "./schemas/post.schema";
import { MongoIdValidationPipe } from "src/pipes/mongo-id-validation.pipe";
import { EmptyBodyValidationPipe } from "src/pipes/empty-body-validation.pipe";

@Controller("posts")
@ApiTags("Posts")
export class PostsController {
 constructor(private readonly postsService: PostsService) {}

 @Post()
 @ApiOperation({ summary: "Create new post" })
 @ApiResponse({
  status: 201,
  description: "The post has been successfully created.",
  type: PostResponseDto,
 })
 @ApiResponse({ status: 400, description: "Bad request (validation failed)" })
 async create(@Body() createPostDto: CreatePostDto): Promise<PostResponseDto> {
  return await this.postsService.create(createPostDto);
 }

 @Get()
 @ApiOperation({ summary: "Get all posts with pagination" })
 @ApiResponse({ status: 200, type: PageableDto<PostModel> })
 async findAll(@Query() queryDto: GetPostsQueryDto): Promise<PageableDto<PostModel>> {
  return await this.postsService.findAll(queryDto);
 }

 @Get(":id")
 @ApiOperation({ summary: "Get post by ID" })
 @ApiResponse({ status: 200, type: PostResponseDto })
 @ApiResponse({ status: 400, description: "Bad request (wrong ID format) " })
 @ApiResponse({ status: 404, description: "Not found" })
 async findOne(@Param("id", new MongoIdValidationPipe()) id: string): Promise<PostResponseDto> {
  return await this.postsService.findOne(id);
 }

 @Patch(":id")
 @ApiOperation({ summary: "Update post fields" })
 @ApiResponse({ status: 200, type: PostResponseDto })
 @ApiResponse({ status: 400, description: "Bad request (validation failed | wrong ID format)" })
 @ApiResponse({ status: 404, description: "Not found" })
 async update(
  @Param("id", new MongoIdValidationPipe()) id: string,
  @Body(new EmptyBodyValidationPipe()) updatePostDto: UpdatePostDto,
 ): Promise<PostResponseDto> {
  console.log("updatePostDto", updatePostDto);

  return await this.postsService.update(id, updatePostDto);
 }

 @Delete(":id")
 @ApiOperation({ summary: "Delete post by ID" })
 @ApiResponse({ status: 400, description: "Bad request (wrong ID format) " })
 @ApiResponse({ status: 200, type: PostResponseDto })
 @ApiResponse({ status: 404, description: "Not found" })
 async remove(@Param("id", new MongoIdValidationPipe()) id: string): Promise<PostResponseDto> {
  return await this.postsService.remove(id);
 }
}
