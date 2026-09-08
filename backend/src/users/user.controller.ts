import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDTO} from "./dto/create-user.dto";
import {UserResponseDTO} from "./dto/user-responde.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    getUsers(): Promise<UserResponseDTO[]> {
        return this.userService.getUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Req() request: any) {
        const userId = request.user.sub;
        return this.userService.getUserById(userId);
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
