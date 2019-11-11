import { ApiModelPropertyOptional } from '@nestjs/swagger';

import { MethodType } from '../../../common/constants/method-type';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { HarEntity } from '../har.entity';

export class HarDto extends AbstractDto {
    @ApiModelPropertyOptional()
    entry: string;

    @ApiModelPropertyOptional({ enum: MethodType })
    method: MethodType;

    @ApiModelPropertyOptional()
    url: string;

    constructor(har: HarEntity) {
        super(har);
        this.method = har.method;
        this.url = har.url;
        this.entry = har.entry;
    }
}
