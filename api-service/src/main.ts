import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ErrFilter } from './errFilter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // validation
    app.useGlobalPipes(new ValidationPipe());

    // error handling
    app.useGlobalFilters(new ErrFilter());

    // swagger API documentation
    const config = new DocumentBuilder()
        .setTitle('human-protocol')
        .setDescription('Rest interface to interact with the Human Protocol')
        .setVersion('1.1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
