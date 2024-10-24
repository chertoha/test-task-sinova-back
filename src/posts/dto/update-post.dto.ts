import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { POST_DTO_CONSTRAINTS } from "src/utils/constants";

export class UpdatePostDto {
 @ApiProperty({
  description: "Post title",
  example: "How to read 100 books during a year",
 })
 @IsString()
 @MinLength(POST_DTO_CONSTRAINTS.TITLE.MIN_LENGTH)
 @MaxLength(POST_DTO_CONSTRAINTS.TITLE.MAX_LENGTH)
 @IsOptional()
 title?: string;

 @ApiProperty({
  description: "Post short description",
  example: "This post explains how to read with enthusiasm ",
 })
 @IsString()
 @MinLength(POST_DTO_CONSTRAINTS.SHORT_DESCRIPTION.MIN_LENGTH)
 @MaxLength(POST_DTO_CONSTRAINTS.SHORT_DESCRIPTION.MAX_LENGTH)
 @IsOptional()
 shortDescription?: string;

 @ApiProperty({
  description: "Post image source",
  example: "http://image_source.jpg",
 })
 @IsString()
 @IsOptional()
 banner?: string;

 @ApiProperty({
  description: "Post content html",
  example: "<p>content...</p>",
 })
 @IsString()
 @IsOptional()
 content?: string;
}
