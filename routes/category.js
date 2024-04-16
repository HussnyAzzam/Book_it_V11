import { Router } from "express";
import { categoryGenerics } from "../generics/index.js";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/category.js";

const router = Router();

router.route(categoryGenerics.routes.getAll.path).get(getCategories);
router.route(categoryGenerics.routes.getById.path).get(getCategoryById);
router.route(categoryGenerics.routes.create.path).post(createCategory);
router.route(categoryGenerics.routes.updateById.path).put(updateCategory);
router.route(categoryGenerics.routes.deleteById.path).delete(deleteCategory);


export default router;