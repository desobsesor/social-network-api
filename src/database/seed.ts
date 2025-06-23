import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { UserSeeder } from './seeders/users.seeder';
import { PostSeeder } from './seeders/posts.seeder';
import { PostRatingSeeder } from './seeders/post-ratings.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const dataSource = app.get(DataSource);

  try {
    console.log('Starting seeding...');

    // Run seeders in order of dependency
    await new UserSeeder(dataSource).run();
    await new PostSeeder(dataSource).run();
    await new PostRatingSeeder(dataSource).run();

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await app.close();
  }
}

bootstrap();