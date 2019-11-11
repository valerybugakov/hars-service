import {
    Post,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Query,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiResponse,
    ApiOkResponse,
    ApiUseTags,
    ApiImplicitFile,
} from '@nestjs/swagger';

import { HarsPageOptionsDto } from './dto/hars-page-options.dto';
import { HarsPageDto } from './dto/hars-page.dto';
import { HarCreateDto } from './dto/HarCreateDto';

import { HarService } from './har.service';
import { HarDto } from './dto/HarDto';

@Controller('hars')
@ApiUseTags('hars')
export class HarController {
    constructor(private _harService: HarService) {}

    @Get('hars')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get hars list',
        type: HarsPageDto,
    })
    getHars(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: HarsPageOptionsDto,
    ): Promise<HarsPageDto> {
        return this._harService.getHars(pageOptionsDto);
    }

    @Post('create')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: HarCreateDto,
        description: 'Successfully Registered',
    })
    @ApiImplicitFile({ name: 'avatar', required: true })
    async userRegister(@Body() harCreateDto: HarCreateDto): Promise<HarDto> {
        const createdUser = await this._harService.createHar(harCreateDto);

        return createdUser.toDto();
    }
}
