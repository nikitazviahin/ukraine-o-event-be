import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateApplicationDto } from './dtos/createApplication.dto';
import { ApplicationService } from './application.service';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { ObjectId } from 'src/interfaces/objectId';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { EUserRole } from 'src/user/enums/userRole.enum';
import { IGetUserAuthInfoRequest } from 'src/interfaces/requestUserInfo.interface';

@ApiTags('applications')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(EUserRole.Creator)
  @Post()
  async createApplication(
    @Body() createApplicationDto: CreateApplicationDto,
    @Request() req: IGetUserAuthInfoRequest,
  ) {
    const result = await this.applicationService.createApplication(
      createApplicationDto,
    );

    return result;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getApplicationById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    const result = await this.applicationService.getApplicationById(id);
    return result;
  }
}
