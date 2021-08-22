import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { TagsRepositories } from '../repositories/TagsRepositories';
import { UserRespositories } from '../repositories/UsersRepositories';

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {

    async execute({ tag_id, user_sender, user_receiver, message } : IComplimentRequest) {

        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const userRepositories = getCustomRepository(UserRespositories);
        const tagRepositories = getCustomRepository(TagsRepositories);

        if (user_sender === user_receiver) {
            throw new Error("Incorrect User Receiver!");
        }

        const userReceivesExists = await userRepositories.findOne(user_receiver);

        if (!user_receiver) {
            throw new Error("User Receiver does not exists!");
        }

        const tagExists = await tagRepositories.findOne(tag_id);

        if (!tagExists) {
            throw new Error("Tag does not exists!");
        }

        const compliments = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        await complimentsRepositories.save(compliments);

        return compliments;

    }

}

export { CreateComplimentService };