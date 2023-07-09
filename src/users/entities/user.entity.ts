import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({
    unique: true,
  })
  @Field()
  email: string;

  @Column()
  @Field(() => Int)
  age: number;

  @OneToMany(() => Product, (product) => product.users)
  @Field(() => [Product])
  orders: Product[];
}
