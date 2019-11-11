import { IsObject, IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { MethodType } from '../../../common/constants/method-type';

export class HarCreateDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly url: string;

    @IsEnum(MethodType)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly method: MethodType;

    @IsObject()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly entry: string;
}
