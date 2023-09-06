import { Body, Controller, Post, Get, UseGuards, Param } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IGetUserAuthInfoRequest } from 'src/interfaces/requestUserInfo.interface';
import { CreateCompetitionDto } from './dtos/createCompetition.dto';

@Controller('competitions')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @ApiBearerAuth()
  @ApiTags('competitions')
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

  @ApiBearerAuth()
  @ApiTags('competitions')
  @UseGuards(JwtAuthGuard)
  @Get('owner')
  async getCompetitionsByOwnerId(@Request() req: IGetUserAuthInfoRequest) {
    const result = await this.competitionService.getCompetitionsByOwnedId(
      req.user.id,
    );

    return result;
  }
}
