import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateApplicationDto } from './dtos/createApplication.dto';
import { ApplicationService } from './application.service';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { ObjectId } from 'src/interfaces/objectId';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('applications')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new application' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unathorized.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({
    status: 409,
    description: 'Application already exists.',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createApplication(@Body() createApplicationDto: CreateApplicationDto) {
    const result = await this.applicationService.createApplication(
      createApplicationDto,
    );

    return result;
  }

  @ApiOperation({ summary: 'Get application by id' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @Get(':id')
  async getApplicationById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    const result = await this.applicationService.getApplicationById(id);
    return result;
  }
}
