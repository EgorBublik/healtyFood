import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "photos"})
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;
  
  @Column()
  username:string;

  @Column()
  fileName: string;

  @Column()
  telegramId: string;

  @Column({ type: 'timestamp', nullable: true })
  date: Date;
}