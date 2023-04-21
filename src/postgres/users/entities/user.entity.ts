import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

export enum Role {
  Client = 'client',
  Admin = 'admin',
  Doctor = 'doctor'
}

@Entity({name: "users"})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  first_name:string;

  @Column({nullable: true})
  username:string;

  @Column({nullable: true})
  password: string;

  @Column({nullable: true})
  telegramId: string;

  @Column({default: Role.Client})
  role: string;
  
  @ManyToOne((type) => User, (user) => user.clients)
  doctor: User

  @OneToMany((type) => User, (user) => user.doctor)
  clients: User[]
}