import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OAuthMapEntityDocument = OAuthMapEntity & Document;

@Schema({
  collection: 'oauth-map',
})
export class OAuthMapEntity {
  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;

  @Prop()
  providerId: string;

  @Prop()
  providerName!: string;

  @Prop()
  userId: string;
}

export const OAuthMapEntitySchema = SchemaFactory.createForClass(OAuthMapEntity);

OAuthMapEntitySchema.virtual('id').get(function () {
  return this._id.toString();
});

OAuthMapEntitySchema.pre('save', async function (this: OAuthMapEntityDocument) {
  const now = new Date();

  if (!this.createdAt) {
    this.createdAt = now;
  }
  this.updatedAt = now;
});
