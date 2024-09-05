import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export const createPaymentIntent = async (req: Request, res: Response) => {
  const { amount } = req.body;


 
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
  
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
  
    res.status(500).send({ error});
  }
};
