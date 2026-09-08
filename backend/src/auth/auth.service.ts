import {Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginDTO} from "./dto/login.dto";
import {UserRepository} from "../users/user.repository";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
       private readonly userRepository: UserRepository,
       private readonly jwtService: JwtService
    ) {}

    async login(loginDTO: LoginDTO) {
        const user = await this.userRepository.findByEmail(loginDTO.email);

        if(!user) {
            throw new UnauthorizedException();
        }

        if (user.password !== loginDTO.password) {
            throw new UnauthorizedException();
        }

        const token = this.jwtService.sign({
            "sub": user.id,
            "email": user.email
        });

        return { "access_token": token }
    }
}
