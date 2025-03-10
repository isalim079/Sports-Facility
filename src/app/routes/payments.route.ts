import express, { Request, Response } from "express";
import Stripe from "stripe";
import config from "../config";

const stripe = new Stripe(config.stripe_secret_key as any);

const router = express.Router();

router.post("/create-payment-intent", async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    const validAmount = parseInt(amount + 100)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: validAmount,
      currency: "USD",
      payment_method_types: ['card']
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error("An unknown error occurred.");
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

export default router;
