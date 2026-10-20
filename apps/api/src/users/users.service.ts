import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  findById(id: string) {
    return this.users.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.users.findOne({ where: { email } });
  }

  create(data: Pick<User, 'email' | 'passwordHash' | 'displayName'>) {
    return this.users.save(this.users.create({ ...data, role: 'user' }));
  }
}
