import { Router } from "express";
import { adminUserGenerics } from "../generics/index.js";
import { getAdminUsers, getAdminUserById, createAdminUser, updateAdminUser, deleteAdminUser } from "../controllers/adminUser.js";

const router = Router();

router.route(adminUserGenerics.routes.getAll.path).get(getAdminUsers);
router.route(adminUserGenerics.routes.getById.path).get(getAdminUserById);
router.route(adminUserGenerics.routes.create.path).post(createAdminUser);
router.route(adminUserGenerics.routes.updateById.path).put(updateAdminUser);
router.route(adminUserGenerics.routes.deleteById.path).delete(deleteAdminUser);


export default router;