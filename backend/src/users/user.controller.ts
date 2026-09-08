import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDTO} from "./dto/create-user.dto";
import {UserResponseDTO} from "./dto/user-responde.dto";

@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    getUsers(): Promise<UserResponseDTO[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    getUser(@Param('id') userId: number): Promise<UserResponseDTO> {
        return this.userService.getUserById(userId);
    }

    @Post()
    createUser(@Body() createUserDTO: CreateUserDTO): Promise<UserResponseDTO> {
        return this.userService.createUser(createUserDTO);
    }
}
