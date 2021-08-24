import { getCustomRepository } from 'typeorm';
import { UserRespositories } from '../repositories/UsersRepositories';

import { classToPlain } from 'class-transformer';

class ListUsersService {

    async execute() {

        const usersRepositories = getCustomRepository(UserRespositories);

        const users = await usersRepositories.find();

        return classToPlain(users);
    }
}

export { ListUsersService };
