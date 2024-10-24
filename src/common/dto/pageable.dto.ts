import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PageOptionsDto } from "./page-options.dto";

interface Options {
 options: PageOptionsDto;
 totalElements: number;
}

export class PageableDto<T> {
 @IsArray()
 @ApiProperty({ isArray: true })
 readonly data: T[];

 @ApiProperty()
 readonly page: number;

 @ApiProperty()
 readonly limit: number;

 @ApiProperty()
 readonly totalElements: number;

 constructor(data: T[], { totalElements, options: { page, limit } }: Options) {
  this.data = data;
  this.page = page;
  this.limit = limit;
  this.totalElements = totalElements;
 }
}
