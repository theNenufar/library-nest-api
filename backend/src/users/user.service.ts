import { Injectable } from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {User} from "./entities/user";

@Injectable()
export class UserService {

    constructor(
       private readonly userRepository: UserRepository
    ) {}

    async getUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}
