import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Param,
  Put,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
import { EUserRole } from 'src/user/enums/userRole.enum';

@ApiTags('competitions')
@Controller('competitions')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new competition' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unathorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 201,
    description: 'Competition created',
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(EUserRole.Creator)
  @Post()
  async createCompetition(
    @Request() req: IGetUserAuthInfoRequest,
    @Body()
    createCompetitionDto: CreateCompetitionDto,
  ) {
    const { id: ownerId } = req.user;

    const result = await this.competitionService.createCompetition({
      ...createCompetitionDto,
      ownerId,
    });

    return result;
  }

  @ApiOperation({ summary: 'Get all competitions' })
  @ApiResponse({
    status: 200,
    description: 'Got all competitions',
  })
  @Get()
  async getCompetitions() {
    const result = await this.competitionService.getCompetitions();

    return result;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all competitions for owner' })
  @ApiResponse({ status: 401, description: 'Unathorized.' })
  @ApiResponse({
    status: 200,
    description: 'Got all competitions for owner',
  })
  @UseGuards(JwtAuthGuard)
  @Get('owner')
  async getCompetitionsByOwnerId(@Request() req: IGetUserAuthInfoRequest) {
    const { id } = req.user;

    const result = await this.competitionService.getCompetitionsByOwnerId(id);

    return result;
  }

  @ApiOperation({ summary: 'Get competition by id' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({
    status: 200,
    description: 'Got competition by id',
  })
  @Get(':id')
  async getCompetitionById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    const result = await this.competitionService.getCompetitionById(id);

    return result;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update competition by id' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unathorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({
    status: 201,
    description: 'Updated competition by id',
  })
  @HttpCode(201)
  @ApiParam({ name: 'id', type: String })
  @Roles(EUserRole.Creator)
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
