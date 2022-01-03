import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Id of the todo' })
  id: string;

  @Column()
  @Field(() => String, { description: 'Text of the todo' })
  text: string;

  @Column()
  @Field(() => String, {
    description: 'Date creation of the Todo ( 22/12/2022)',
  })
  createdAt: string;

  @Column()
  @Field(() => String, { description: 'Status of the todo (todo ,done...)' })
  status: string;
}
