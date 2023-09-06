import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('ukraine-o-event')
    .setDescription('The ukraine-o-event API description')
    .setVersion('1.0.0')
    .addTag('ukraine-o-event')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

export { swaggerConfig };
