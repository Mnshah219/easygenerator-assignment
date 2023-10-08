import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>
@Schema({ timestamps: true })
export class User {

    @Prop({ required: true })
    name: string;

    @Prop({ index: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    // can have extra props like role, profile image etc
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const rounds = Number(process.env.SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, rounds);
});