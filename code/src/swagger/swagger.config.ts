import { DocumentBuilder } from "@nestjs/swagger";

export const config = new DocumentBuilder()
    .setTitle('Study Pal API')
    .setDescription('The API to the study PAL backend')
    .setVersion('1.0')
    .addTag('study pal')
    .build();

    