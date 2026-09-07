import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./entities/user";
import {CreateUserDTO} from "./dto/create-user.dto";

@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    getUser(@Param('id') userId: number): Promise<User> {
        return this.userService.getUserById(userId);
    }

    @Post()
    createUser(@Body() createUserDTO: CreateUserDTO) {
        return this.userService.createUser(createUserDTO);
    }
}
