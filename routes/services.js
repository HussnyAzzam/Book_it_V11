import { Router } from "express";
import { createService, deleteService, getServiceById, getServices, updateService } from "../controllers/services.js";
import { serviceGenerics } from "../generics/index.js";

const router = Router();

router.route(serviceGenerics.routes.getAll.path).get(getServices);
router.route(serviceGenerics.routes.getById.path).get(getServiceById);
router.route(serviceGenerics.routes.create.path).post(createService);
router.route(serviceGenerics.routes.updateById.path).put(updateService);
router.route(serviceGenerics.routes.deleteById.path).delete(deleteService);


export default router;