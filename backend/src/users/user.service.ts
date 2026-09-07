import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {User} from "./entities/user";
import {CreateUserDTO} from "./dto/create-user.dto";
import {UserResponseDTO} from "./dto/user-responde.dto";

@Injectable()
export class UserService {

    constructor(
       private readonly userRepository: UserRepository
    ) {}

    async getUsers(): Promise<UserResponseDTO[]> {
        const users = await this.userRepository.findAll();
        return UserResponseDTO.fromUsers(users);
    }

    async getUserById(userId: number): Promise<UserResponseDTO> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundException();
        }

        return UserResponseDTO.fromUser(user);
    }

    async createUser(createUseDTO: CreateUserDTO): Promise<UserResponseDTO> {
        const user = await this.userRepository.findByEmail(createUseDTO.email);
        if (user) {
            throw new ConflictException();
        }

        const newUser: User = new User(createUseDTO.name, createUseDTO.email, createUseDTO.password);

        const savedUser = await this.userRepository.save(newUser);

        return new UserResponseDTO(savedUser.id, savedUser.name, savedUser.email);
    }
}
