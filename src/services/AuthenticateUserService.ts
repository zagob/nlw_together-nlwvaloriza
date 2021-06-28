import { getCustomRepository } from "typeorm"

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepository } from "../repositories/UsersRepository"

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        // Verificar se email existe
        const usersRepositories = getCustomRepository(UsersRepository);

        const user = await usersRepositories.findOne({ email })

        if (!user) {
            throw new Error("Email/Password incorrect");
        }

        // verificar se senha está correta 
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        // gerar token
        const token = sign({
            email: user.email
        }, "64e05481601023969872b03cfcb78d80", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}

export { AuthenticateUserService }