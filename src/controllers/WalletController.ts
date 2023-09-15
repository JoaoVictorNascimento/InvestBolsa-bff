import { Request, Response } from "express";
import { walletRepository } from "../repositories/walletRepository";
import { z } from "zod";

const createWalletSchema = z.object({
  user_id: z.number(),
});

const updateWalletSchema = z.object({
  id: z.number(),
  balance: z.number(),
  patrimony: z.number(),
});

export class WalletController {
  async create(req: Request, res: Response) {
    try {
      const validatedData = createWalletSchema.parse(req.body);
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
    const walletSearched = await walletRepository.findBy({ user_id });

    return res.status(201).json(walletSearched);
  }

  async updateWalletById(req: Request, res: Response) {
    try {
      const { id, balance, patrimony } = req.body;
        
      const wallet = await walletRepository.findOne({ where: { id } });
  
      if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
      }
  
      wallet.balance = balance;
      wallet.patrimony = patrimony;
  
      await walletRepository.save(wallet);
  
      return res.status(200).json(wallet);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}