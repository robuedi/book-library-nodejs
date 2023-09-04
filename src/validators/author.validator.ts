import { IsString, IsNotEmpty, IsOptional, Matches } from "class-validator";

export class StoreAuthorRequest {
    @IsString()
    @IsNotEmpty()
    name!: string;
}

export class UpdateAuthorRequest extends StoreAuthorRequest {
    @IsOptional()
    name!: string;
}

export class AuthorIdRequest {
    @Matches(/^\d+$/, {
        message: 'Must be an integer value'
    })
    id!: number;
}