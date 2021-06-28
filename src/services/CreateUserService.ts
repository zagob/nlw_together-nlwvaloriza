import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({ email, name, admin }: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepository);

        if (!email) {
            throw new Error("Email incorreto")
        }

        const userAlreadyExists = await usersRepository.findOne({ email })

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const user = usersRepository.create({
            name,
            email,
            admin
        })

        await usersRepository.save(user)

        return user;
    }
}

export { CreateUserService }