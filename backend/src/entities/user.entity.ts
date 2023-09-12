import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import * as mongoose from 'mongoose';
import { UserFullNameDto } from 'src/models/user/user.name.dto';
import { UserResponse } from 'src/models/user/user.response';

export type UserEntityDocument = UserEntity & mongoose.Document;

@Schema({
  collection: 'user',
})
export class UserEntity {
  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;

  @Prop()
  userName!: string;

  @Prop()
  imageUrl!: string;

  @Prop()
  country?: string;

  @Prop()
  refreshToken?: string;

  @Prop()
  email!: string;

  @Prop(UserFullNameDto)
  name!: UserFullNameDto;

  static toUserDto(user: UserEntityDocument): UserResponse {
    return {
      id: user.id,
      createdAt: dayjs(user.createdAt).toISOString(),
      updatedAt: dayjs(user.updatedAt).toISOString(),
      userName: user.userName,
      email: user.email,
      imageUrl: user.imageUrl,
      name: user.name,
    };
  }
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

UserEntitySchema.virtual('id').get(function () {
  return this._id.toString();
});

UserEntitySchema.pre('save', async function (this: UserEntityDocument) {
  const now = new Date();

  if (!this.createdAt) {
    this.createdAt = now;
  }
  this.updatedAt = now;
});
