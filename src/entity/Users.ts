import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 用户

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column({
    default: null,
  })
  username: string;

  @Column()
  avatar: string;

  @Column()
  create_time: Date;

  @Column()
  last_login: Date;

  @Column({
    default: null,
  })
  email: string;
}
