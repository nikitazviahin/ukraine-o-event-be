import { BadRequestException, ExecutionContext } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LogInUserDto } from '../dtos/loginUser.dto';
import { validate } from 'class-validator';
import { Request } from 'express';

const validateLogin = async (context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<Request>();

  const body = plainToClass(LogInUserDto, request.body);
  const errors = await validate(body);

  const errorMessages = errors.flatMap(({ constraints }) =>
    Object.values(constraints),
  );

  if (errorMessages.length > 0) throw new BadRequestException(errorMessages);
};

export default validateLogin;
