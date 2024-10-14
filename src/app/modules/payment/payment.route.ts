import express from "express";
import { PaymentController } from "./payment.controller";
const router = express.Router();

router.post("/checkout", PaymentController.advancePayment);

export const PaymentRoute = router;
