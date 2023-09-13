import { Request, Response } from "express";
import { walletRepository } from "../repositories/walletRepository";
import { z } from "zod";

const CreateWalletSchema = z.object({
  user_id: z.number(),
});

export class WalletController {
  async create(req: Request, res: Response) {
    try {
      const validatedData = CreateWalletSchema.parse(req.body);

      const newWallet = walletRepository.create({ user_id: validatedData.user_id });
      await walletRepository.save(newWallet);

      return res.status(201).json(newWallet);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({ message: 'Validation failed', errors: error.errors });
      } else {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }
}