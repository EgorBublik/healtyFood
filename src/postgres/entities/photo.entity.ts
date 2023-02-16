import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "photos"})
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  
  @Column()
  username:string;

  @Column()
  fileName: string;

}