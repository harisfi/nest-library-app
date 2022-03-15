import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/common/config/role.enum';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed(): Promise<void> {
    const user = this.userRepository.create({
      username: 'user',
      password: 'password',
      name: 'user123',
      role: RoleEnum.User
    });
    const admin = this.userRepository.create({
      username: 'admin',
      password: 'password',
      name: 'admin123',
      role: RoleEnum.Admin
    });

    await Promise.all([
      this.userRepository.save(user),
      this.userRepository.save(admin),
    ]);
  }
}
