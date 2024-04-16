import { Router } from "express";
import { packageGenerics } from "../generics/index.js";
import { createPackage, deletePackage, getPackageById, getPackages, updatePackage } from "../controllers/package.js";

const router = Router();

router.route(packageGenerics.routes.getAll.path).get(getPackages);
router.route(packageGenerics.routes.getById.path).get(getPackageById);
router.route(packageGenerics.routes.create.path).post(createPackage);
router.route(packageGenerics.routes.updateById.path).put(updatePackage);
router.route(packageGenerics.routes.deleteById.path).delete(deletePackage);


export default router;