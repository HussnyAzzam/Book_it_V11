import { Router } from "express";
import { businessBranchGenerics } from "../generics/index.js";
import { createBusinessBranch, getBusinessBranchById, getBusinessBranches, updateBusinessBranch, deleteBusinessBranch } from "../controllers/businessBranch.js";

const router = Router();

router.route(businessBranchGenerics.routes.getAll.path).get(getBusinessBranches);
router.route(businessBranchGenerics.routes.getById.path).get(getBusinessBranchById);
router.route(businessBranchGenerics.routes.create.path).post(createBusinessBranch);
router.route(businessBranchGenerics.routes.updateById.path).put(updateBusinessBranch);
router.route(businessBranchGenerics.routes.deleteById.path).delete(deleteBusinessBranch);


export default router;