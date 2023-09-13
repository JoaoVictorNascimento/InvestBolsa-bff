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
      const { user_id } = req.body;

      if((await walletRepository.findBy({ user_id })).length) {
        return res.status(422).json({ message: 'Wallet alread exists' });
      }

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

  async getWalletByUserId(req: Request, res: Response) {
    const { user_id } = req.body;
    console.log({ user_id })
    const walletSearched = await walletRepository.findBy({ user_id});

    return res.status(201).json(walletSearched);
  }
}