import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateApplicationDto } from './dtos/createApplication.dto';
import { ApplicationService } from './application.service';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { ObjectId } from 'src/interfaces/objectId';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateApplicationResponse,
  GetApplicationResponse,
} from './interfaces/applicationResponses';

@ApiTags('applications')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new application' })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'Applcation created',
    type: CreateApplicationResponse,
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createApplication(@Body() createApplicationDto: CreateApplicationDto) {
    const result = await this.applicationService.createApplication(
      createApplicationDto,
    );

    return result;
  }

  @ApiOperation({ summary: 'Get application by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Got application by id',
    type: GetApplicationResponse,
  })
  @Get(':id')
  async getApplicationById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    const result = await this.applicationService.getApplicationById(id);
    return result;
  }
}
