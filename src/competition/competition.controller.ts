import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Param,
  Put,
} from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IGetUserAuthInfoRequest } from 'src/interfaces/requestUserInfo.interface';
import { CreateCompetitionDto } from './dtos/createCompetition.dto';
import { UpdateCompetitionByIdDto } from './dtos/updateCompetitionById.dto';
import { IParametersId } from 'src/interfaces/parametersId.interface';
import { castObjectId } from 'src/helpers/castObjectId';

@Controller('competitions')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @ApiTags('competitions')
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

  @ApiTags('competitions')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('owner')
  async getCompetitionsByOwnerId(@Request() req: IGetUserAuthInfoRequest) {
    const result = await this.competitionService.getCompetitionsByOwnedId(
      req.user.id,
    );

    return result;
  }

  @ApiTags('competitions')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateCompetitionById(
    @Request() req: IGetUserAuthInfoRequest,
    @Body() updateCompetitionByIdDto: UpdateCompetitionByIdDto,
    @Param() params: IParametersId,
  ) {
    const result = await this.competitionService.updateCompetitionById({
      ...updateCompetitionByIdDto,
      competitionId: castObjectId(params.id),
      userId: req.user.id,
    });

    return result;
  }
}
