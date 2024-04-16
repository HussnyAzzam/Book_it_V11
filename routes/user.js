import { Router } from "express";
import { userGenerics } from "../generics/index.js";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.js";
import { createAdminUser } from "../controllers/adminUser.js"

const router = Router();

router.route(userGenerics.routes.getAll.path).get(getUsers);
router.route(userGenerics.routes.getById.path).get(getUserById);
router.route(userGenerics.routes.create.path).post(createUser);
router.route(userGenerics.routes.updateById.path).put(updateUser);
router.route(userGenerics.routes.deleteById.path).delete(deleteUser);
router.route(userGenerics.routes.makeAdmin.path).post(createAdminUser)


export default router;