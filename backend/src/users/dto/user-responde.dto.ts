import {User} from "../entities/user";

export class UserResponseDTO {
    id: number;
    name: string;
    email: string;

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static fromUser(user: User): UserResponseDTO {
        return new UserResponseDTO(
            user.id,
            user.name,
            user.email
        );
    }

    static fromUsers(users: User[]): UserResponseDTO[] {
        return users.map(user => UserResponseDTO.fromUser(user));
    }
}