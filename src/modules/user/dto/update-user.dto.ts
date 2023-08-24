import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    MaxLength,
} from 'class-validator';
export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    userName: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(30)
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    password: string;
}
