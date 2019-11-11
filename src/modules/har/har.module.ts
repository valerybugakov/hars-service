import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HarService } from './har.service';
import { HarController } from './har.controller';
import { AuthModule } from '../auth/auth.module';
import { HarRepository } from './har.repository';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([HarRepository]),
    ],
    controllers: [HarController],
    exports: [HarService],
    providers: [HarService],
})
export class HarModule {}
