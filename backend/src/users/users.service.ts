import { Injectable } from '@nestjs/common';
import { RegisterUserInput } from './dto/registerUser.input';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createUserInput: RegisterUserInput) {
    return this.databaseService.user.create({
      data: createUserInput,
    });
  }
}
