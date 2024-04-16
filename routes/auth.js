import { Router } from "express";
import { authGenerics } from "../generics/index.js";
import { signIn, signUp, adminSignIn, adminSignUp } from "../controllers/auth.js";

const router = Router();

router.route(authGenerics.routes.signIn.path).post(signIn);
router.route(authGenerics.routes.signUp.path).post(signUp);
router.route(authGenerics.routes.adminSignIn.path).post(adminSignIn);
router.route(authGenerics.routes.adminSignUp.path).post(adminSignUp);


export default router;