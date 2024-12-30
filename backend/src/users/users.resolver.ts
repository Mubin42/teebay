import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { RegisterUserInput } from './dto/registerUser.input';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './entities/login.entity';
import { Self } from './entities/self.entity';
import { LoggedInUser } from '../common/decorators/loggedInUser.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async registerUser(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ) {
    return await this.usersService.create(registerUserInput);
  }

  @Mutation(() => LoginResponse)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const { token } = await this.usersService.login(loginInput);
    return { token };
  }

  @UseGuards(AuthGuard)
  @Query(() => Self)
  async getSelf(@LoggedInUser() user: LoggedInUser) {
    return user;
  }
}
