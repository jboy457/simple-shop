import { ObjectType, Field, Float, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({
    type: 'decimal',
  })
  @Field(() => Float)
  price: number;

  @ManyToOne(() => User, (user) => user.orders)
  users?: User[];
}
