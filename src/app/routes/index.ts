import { Router } from "express";
import { ProductRouter } from "../modules/Product/product.route";
import { PaymentRoute } from "../modules/payment/payment.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/product",
    route: ProductRouter,
  },
  {
    path: "/payment",
    route: PaymentRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
