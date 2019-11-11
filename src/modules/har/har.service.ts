import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { HarEntity } from './har.entity';
import { HarRepository } from './har.repository';
import { IFile } from '../../interfaces/IFile';
import { ValidatorService } from '../../shared/services/validator.service';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { HarsPageOptionsDto } from './dto/hars-page-options.dto';
import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { HarsPageDto } from './dto/hars-page.dto';
import { HarCreateDto } from './dto/HarCreateDto';

@Injectable()
export class HarService {
    constructor(
        public readonly harRepository: HarRepository,
        public readonly validatorService: ValidatorService,
        public readonly awsS3Service: AwsS3Service,
    ) {}

    /**
     * Find single har
     */
    findOne(findData: FindConditions<HarEntity>): Promise<HarEntity> {
        return this.harRepository.findOne(findData);
    }

    async findByHarnameOrEmail(
        options: Partial<{ harname: string; email: string }>,
    ): Promise<HarEntity | undefined> {
        const queryBuilder = this.harRepository.createQueryBuilder('har');

        if (options.email) {
            queryBuilder.orWhere('har.email = :email', {
                email: options.email,
            });
        }
        if (options.harname) {
            queryBuilder.orWhere('har.harname = :harname', {
                harname: options.harname,
            });
        }

        return queryBuilder.getOne();
    }

    async createHar(harCreateDto: HarCreateDto): Promise<HarEntity> {
        const har = this.harRepository.create(harCreateDto);

        return this.harRepository.save(har);
    }

    async getHars(pageOptionsDto: HarsPageOptionsDto): Promise<HarsPageDto> {
        const queryBuilder = this.harRepository.createQueryBuilder('har');
        const [hars, harsCount] = await queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount();

        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: harsCount,
        });
        return new HarsPageDto(hars.toDtos(), pageMetaDto);
    }
}
