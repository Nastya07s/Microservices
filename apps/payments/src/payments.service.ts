import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), { apiVersion: '2023-10-16' });

  constructor(private readonly configService: ConfigService) {}
  async createCharge({ card, amount }: CreateChargeDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    const paymentIntent = await this.stripe.paymentIntents.create({
      // payment_method: paymentMethod?.id,
      // payment_method_types: ['card'],
      payment_method: 'pm_card_visa',
      amount: amount * 100,
      currency: 'usd',
      confirm: true,
      return_url: 'http://localhost:3000/reservations',
    });

    return paymentIntent;
  }
}
