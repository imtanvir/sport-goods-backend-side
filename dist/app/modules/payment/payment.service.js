"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const app_1 = require("../../../app");
const advancePayment = (amount) => __awaiter(void 0, void 0, void 0, function* () {
    const amountConvert = Math.round(amount * 100);
    const paymentIntent = yield app_1.stripe.paymentIntents.create({
        amount: amountConvert,
        currency: "usd",
        payment_method_types: ["card"],
    });
    const result = {
        clientSecret: paymentIntent.client_secret,
    };
    return result;
});
exports.PaymentService = {
    advancePayment,
};
