import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UserRespositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest) {

        const usersRepositories = getCustomRepository(UserRespositories);

        const user = await usersRepositories.findOne({
            email
        });

        const passwordMatch = await compare(password, user.password);

        if (!user) {
            throw new Error("Email/Password incorrect");
        }

        const token = sign({
            email: user.email,

        }, "b5017cc5298636a71169ff5175383ecc",{
            subject: user.id,
            expiresIn: "1d"
        });
        
        return token;

    }
}

export { AuthenticateUserService }