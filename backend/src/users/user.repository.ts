import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user';

@Injectable()
export class UserRepository {

    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {}

    async save(userEntity: User): Promise<User> {
        return this.repository.save(userEntity);
    }

    async findAll(): Promise<User[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<User | null> {
        return this.repository.findOne({
            where: { id }
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({
            where: { email }
        });
    }

}