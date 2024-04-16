import { Router } from "express";
import { dictionaryGenerics } from "../generics/index.js";
import { createDictionary, getDictionaries, getDictionaryById, updateDictionary, deleteDictionary } from "../controllers/dictionary.js";

const router = Router();

router.route(dictionaryGenerics.routes.getAll.path).get(getDictionaries);
router.route(dictionaryGenerics.routes.getById.path).get(getDictionaryById);
router.route(dictionaryGenerics.routes.create.path).post(createDictionary);
router.route(dictionaryGenerics.routes.updateById.path).put(updateDictionary);
router.route(dictionaryGenerics.routes.deleteById.path).delete(deleteDictionary);


export default router;