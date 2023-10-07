import { Transform } from "class-transformer"
import { IsEmail, IsString, IsNotEmpty, MinLength, Matches } from "class-validator"

export class SignUpRequestDto {

    @IsNotEmpty()
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Matches(/.*\d.*/, {
        message: 'Password must contain atleast one digit'
    })
    @Matches(/.*[a-zA-Z].*/, {
        message: 'Password must contain atleast one letter'
    })
    @Matches(/.*[\@#\!\-_\.].*/, {
        message: 'Password must contain atleast one special character'
    })
    password: string

    @IsNotEmpty()
    @IsString()
    name: string
}