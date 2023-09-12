import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TokenUsageType } from 'src/models/auth/token.usage.type';

export type TokenListEntityDocument = TokenListEntity & Document;

@Schema({
  collection: 'token-list',
})
export class TokenListEntity {
  @Prop()
  createdAt!: Date;

  @Prop()
  userId!: string;

  @Prop()
  token!: string;

  @Prop({ type: String })
  usageType!: TokenUsageType;

  @Prop()
  isUsed!: boolean;
}

export const TokenListEntitySchema = SchemaFactory.createForClass(TokenListEntity);

TokenListEntitySchema.virtual('id').get(function () {
  return this._id.toString();
});

TokenListEntitySchema.pre('save', async function (this: TokenListEntityDocument) {
  const now = new Date();

  if (!this.createdAt) {
    this.createdAt = now;
  }
});
