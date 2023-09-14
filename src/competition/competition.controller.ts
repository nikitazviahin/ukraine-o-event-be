import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Param,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
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
import {
  CompetitionCreatedResponse,
  GetCompetitionResponse,
} from './interfaces/competitionResponces';

@ApiTags('competitions')
@Controller('competitions')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new competition' })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'Competition created',
    type: CompetitionCreatedResponse,
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
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Got all competitions',
    type: [GetCompetitionResponse],
  })
  @Get()
  async getCompetitions() {
    const result = await this.competitionService.getCompetitions();
    return result;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all competitions for owner' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Got all competitions for owner',
    type: [GetCompetitionResponse],
  })
  @UseGuards(JwtAuthGuard)
  @Get('owner')
  async getCompetitionsByOwnerId(@Request() req: IGetUserAuthInfoRequest) {
    const { id } = req.user;

    const result = await this.competitionService.getCompetitionsByOwnerId(id);
    return result;
  }

  @ApiOperation({ summary: 'Get competition by id' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Got competition by id',
    type: GetCompetitionResponse,
  })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  async getCompetitionById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    const result = await this.competitionService.getCompetitionById(id);

    return result;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update competition by id' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Updated competition by id',
    type: GetCompetitionResponse,
  })
  @ApiParam({ name: 'id', type: String })
  @HttpCode(HttpStatus.CREATED)
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
