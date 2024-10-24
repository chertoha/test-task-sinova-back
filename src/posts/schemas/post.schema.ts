import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PostDocument = HydratedDocument<Post>;

@Schema({ versionKey: false })
export class Post {
 @Prop({ type: String, required: true, unique: true })
 title: string;

 @Prop({ type: String, required: true })
 shortDescription: string;

 @Prop({ type: String, required: true })
 banner: string;

 @Prop({ type: String })
 content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
