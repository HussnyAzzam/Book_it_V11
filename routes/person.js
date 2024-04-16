import { Router } from "express";
import { personGenerics } from "../generics/index.js";
import { createPerson, deletePerson, getPersonById, getPersons, updatePerson } from "../controllers/person.js";

const router = Router();

router.route(personGenerics.routes.getAll.path).get(getPersons);
router.route(personGenerics.routes.getById.path).get(getPersonById);
router.route(personGenerics.routes.create.path).post(createPerson);
router.route(personGenerics.routes.updateById.path).put(updatePerson);
router.route(personGenerics.routes.deleteById.path).delete(deletePerson);


export default router;