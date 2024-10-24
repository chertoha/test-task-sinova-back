import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class PostResponseDto {
 @ApiProperty({ description: "Post ID", type: String })
 _id: Types.ObjectId;

 @ApiProperty({ description: "Post title" })
 title: string;

 @ApiProperty({ description: "Post short description" })
 shortDescription: string;

 @ApiProperty({ description: "Post banner" })
 banner: string;

 @ApiProperty({ description: "Post content" })
 content?: string;
}
