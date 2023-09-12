import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('wallets')
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ type: "int" })
    user_id: number
    
    @Column({ type: "float" })
    balance: number
    
    @Column({ type: "float" })
    patrimony: number
    
    @Column({ type: "float" })
    invested: number
}