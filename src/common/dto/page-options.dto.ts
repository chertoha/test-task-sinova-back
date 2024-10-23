import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class PageOptionsDto {
 @ApiPropertyOptional({
  default: 1,
  minimum: 1,
 })
 @Type(() => Number)
 @IsInt()
 @Min(1)
 @IsOptional()
 readonly page?: number = 1;

 @ApiPropertyOptional({
  default: 10,
  minimum: 1,
  maximum: 1000,
 })
 @Type(() => Number)
 @IsInt()
 @Min(1)
 @Max(1000)
 @IsOptional()
 readonly limit?: number = 10;

 get skip() {
  return (this.page - 1) * this.limit;
 }
}
