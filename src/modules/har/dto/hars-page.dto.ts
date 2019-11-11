import { HarDto } from './HarDto';
import { ApiModelProperty } from '@nestjs/swagger';
import { PageMetaDto } from '../../../common/dto/PageMetaDto';

export class HarsPageDto {
    @ApiModelProperty({
        type: HarDto,
        isArray: true,
    })
    readonly data: HarDto[];

    @ApiModelProperty()
    readonly meta: PageMetaDto;

    constructor(data: HarDto[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
