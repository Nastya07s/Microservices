import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export default class AbstractDocument extends Document {
  @Prop()
  _id: Types.ObjectId;
}
