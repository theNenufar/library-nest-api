import {UserService} from "./user.service";

describe('UserService', () => {
    let userService: UserService;
    let userRepository: any;

    beforeEach(() => {
        userRepository = {
            findByEmail: jest.fn(),
            save: jest.fn()
        };

        userService = new UserService(userRepository);
    })

    it('should create user', async () => {
        //Arrange
        const createUserDTO = {
            name: 'João',
            email: 'joao@email.com',
            password: 'Aa123456!'
        };
        userRepository.findByEmail = jest.fn().mockResolvedValue(null);
        userRepository.save = jest.fn().mockResolvedValue({
            id: 1,
            name: 'João',
            email: 'joao@email.com',
            password: 'Aa123456!'
        });

        //Act
        const result = await userService.createUser(createUserDTO);

        //Assert
        expect(result).toEqual({
            id: 1,
            name: 'João',
            email: 'joao@email.com'
        });
        expect(userRepository.findByEmail).toHaveBeenCalledWith('joao@email.com');
        expect(userRepository.save).toHaveBeenCalled();
    })
})