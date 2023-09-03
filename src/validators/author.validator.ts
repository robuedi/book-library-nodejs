import { IsString, IsNotEmpty, MinLength, ValidationError, validate } from "class-validator";

export class StoreAuthorRequest {
    @IsString()
    @IsNotEmpty()
    name!: string;
}