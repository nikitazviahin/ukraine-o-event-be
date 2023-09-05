import { ExecutionContext, HttpStatus } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LogInUserDto } from '../dtos/loginUser.dto';
import { validate } from 'class-validator';
import { Request, Response } from 'express';

const validateLogin = async (context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<Request>();
  const response = context.switchToHttp().getResponse<Response>();

  const body = plainToClass(LogInUserDto, request.body);
  const errors = await validate(body);

  const errorMessages = errors.flatMap(({ constraints }) =>
    Object.values(constraints),
  );

  if (errorMessages.length > 0) {
    response.status(HttpStatus.BAD_REQUEST).send({
      statusCode: HttpStatus.BAD_REQUEST,
      error: 'Bad Request',
      message: errorMessages,
    });
  }
};

export default validateLogin;
