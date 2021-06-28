import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";

import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserControler = new CreateUserController();
const createTagController = new CreateTagController();

router.post("/tags", ensureAdmin, createTagController.handle);
router.post("/users", createUserControler.handle);

export { router }