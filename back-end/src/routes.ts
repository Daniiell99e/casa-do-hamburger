import { Router } from "express";
import { login, register, auth, logout } from "./controller/user-controller.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import { deleteProducts, getProducts } from "./controller/product-controller.js";

export const router = Router();

// Rotas de usuario
router.post("/login", login);
router.post("/register", register);
router.get("/me", authMiddleware, auth);
router.post("/logout", authMiddleware, logout);

// Rota de produto
router.get("/get-products", getProducts)
router.delete("/delete-product/:id", authMiddleware, deleteProducts);
