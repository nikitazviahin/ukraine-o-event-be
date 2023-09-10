import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Param,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IGetUserAuthInfoRequest } from 'src/interfaces/requestUserInfo.interface';
import { CreateCompetitionDto } from './dtos/createCompetition.dto';
import { UpdateCompetitionByIdDto } from './dtos/updateCompetitionById.dto';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { ObjectId } from 'src/interfaces/objectId';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';

@ApiTags('competitions')
@Controller('competitions')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async createCompetition(
    @Request() req: IGetUserAuthInfoRequest,
    @Body()
    createCompetitionDto: CreateCompetitionDto,
  ) {
    const result = await this.competitionService.createCompetition({
      ...createCompetitionDto,
      ownerId: req.user.id,
    });
    return result;
  }

  @Get()
  async getCompetitions() {
    const result = await this.competitionService.getCompetitions();

    return result;
  }

  @Get(':id')
  async getCompetitionById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    const result = await this.competitionService.getCompetitionById(id);

    return result;
  }

  @ApiBearerAuth()
  @Roles('creator')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('owner')
  async getCompetitionsByOwnerId(@Request() req: IGetUserAuthInfoRequest) {
    const result = await this.competitionService.getCompetitionsByOwnerId(
      req.user.id,
    );

    return result;
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  @Roles('creator')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':id')
  async updateCompetitionById(
    @Request() req: IGetUserAuthInfoRequest,
    @Body() updateCompetitionByIdDto: UpdateCompetitionByIdDto,
    @Param('id', ParseObjectIdPipe) id: ObjectId,
  ) {
    const result = await this.competitionService.updateCompetitionById({
      ...updateCompetitionByIdDto,
      competitionId: id,
      userId: req.user.id,
    });

    return result;
  }
}
