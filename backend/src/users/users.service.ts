import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserInput } from './dto/registerUser.input';
import { DatabaseService } from '../utilities/database/database.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './dto/login.input';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserInput: RegisterUserInput) {
    const isUserExist = await this.databaseService.user.findUnique({
      where: {
        email: createUserInput.email,
      },
    });
    if (isUserExist) {
      throw new NotFoundException('User already exists');
    }

    // Hash the password before saving it to the database
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);

    return this.databaseService.user.create({
      data: createUserInput,
    });
  }

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async login(loginInput: LoginInput) {
    const user = await this.databaseService.user.findUnique({
      where: {
        email: loginInput.email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginInput.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid password');
    }

    const token = this.jwtService.sign({ id: user.id });

    return {
      token: `Bearer ${token}`,
      user,
    };
  }
}
