import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('wallets')
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ type: "int", })
    user_id: number
    
    @Column({ type: "float", nullable: true })
    balance: number
    
    @Column({ type: "float", nullable: true })
    patrimony: number
    
    @Column({ type: "float", nullable: true })
    invested: number
}