import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'Text of the todo' })
  text: string;

  @Field(() => String, {
    description: 'Date creation of the Todo ( 22/12/2022)',
  })
  createdAt: string;

  @Field(() => String, { description: 'Status of the todo (todo ,done...)' })
  status: string;
}
