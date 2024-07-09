import { Router } from "express";
import { ProductRouter } from "../modules/Product/product.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/product",
    route: ProductRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
