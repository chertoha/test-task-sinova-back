import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

export class DeleteBatchPostsDto {
 @ApiProperty({
  description: "Array of post IDs to delete",
  example: ["671952e017183c9c7d6934b7", "671a47faf9e03d54cf5e4c17", "671a48aff9e03d54cf5e4c2f"],
  type: [String],
 })
 @IsArray()
 @ArrayNotEmpty({ message: "IDs array cannot be empty" })
 @IsString({ each: true, message: "Each ID must be an string" })
 ids: string[];
}
