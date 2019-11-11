import { Entity, Column } from 'typeorm';

import { MethodType } from '../../common/constants/method-type';
import { AbstractEntity } from '../../common/abstract.entity';
import { HarDto } from './dto/HarDto';

@Entity({ name: 'hars' })
export class HarEntity extends AbstractEntity<HarDto> {
    @Column({ type: 'jsonb' })
    entry: string;

    @Column({ type: 'enum', enum: MethodType, default: MethodType.Get })
    method: MethodType;

    @Column({ nullable: true })
    url: string;

    dtoClass = HarDto;
}
