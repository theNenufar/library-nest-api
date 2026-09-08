import {JwtService} from "@nestjs/jwt";
import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class JwtAuthGuard implements CanActivate{

    constructor(
        private readonly jwtService: JwtService
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
            throw new UnauthorizedException();
        }

        const token = authHeader.split(' ')[1];

        const payload = this.jwtService.verify(token);

        request.user = payload;

        return true;
    }
}