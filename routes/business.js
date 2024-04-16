import { Router } from "express";
import { businessGenerics } from "../generics/index.js";
import { createBusiness, deleteBusiness, getBusinessById, getBusinesses, updateBusiness } from "../controllers/business.js";

const router = Router();

router.route(businessGenerics.routes.getAll.path).get(getBusinesses);
router.route(businessGenerics.routes.getById.path).get(getBusinessById);
router.route(businessGenerics.routes.create.path).post(createBusiness);
router.route(businessGenerics.routes.updateById.path).put(updateBusiness);
router.route(businessGenerics.routes.deleteById.path).delete(deleteBusiness);


export default router;