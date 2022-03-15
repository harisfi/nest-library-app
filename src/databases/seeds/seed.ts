import { NestFactory } from "@nestjs/core";
import { BookSeeder } from "./providers/book.seeder";
import { UserSeeder } from "./providers/user.seeder";
import { SeedModule } from "./seed.module";

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);
  const bookSeeder = appContext.get(BookSeeder);
  const userSeeder = appContext.get(UserSeeder);

  await bookSeeder.seed();
  await userSeeder.seed();

  await appContext.close();
}

bootstrap();