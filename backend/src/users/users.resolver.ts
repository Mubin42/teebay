import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { RegisterUserInput } from './dto/registerUser.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('registerUserInput') registerUserInput: RegisterUserInput) {
    return this.usersService.create(registerUserInput);
  }
}
