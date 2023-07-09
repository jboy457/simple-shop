import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
