import { Router } from "express";
import { externalCustomersGenerics  } from "../generics/index.js";
import { createExternalCustomer, getExternalCustomerById, getExternalCustomers, updateExternalCustomer, deleteExternalCustomer } from "../controllers/externalCustomers.js";

const router = Router();

router.route(externalCustomersGenerics.routes.getAll.path).get(getExternalCustomers);
router.route(externalCustomersGenerics.routes.getById.path).get(getExternalCustomerById);
router.route(externalCustomersGenerics.routes.create.path).post(createExternalCustomer);
router.route(externalCustomersGenerics.routes.updateById.path).put(updateExternalCustomer);
router.route(externalCustomersGenerics.routes.deleteById.path).delete(deleteExternalCustomer);


export default router;