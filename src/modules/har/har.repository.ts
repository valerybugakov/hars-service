import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { HarEntity } from './har.entity';

@EntityRepository(HarEntity)
export class HarRepository extends Repository<HarEntity> {}
