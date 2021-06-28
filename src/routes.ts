import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

const createUserControler = new CreateUserController();

router.post("/users", createUserControler.handle);

export { router }