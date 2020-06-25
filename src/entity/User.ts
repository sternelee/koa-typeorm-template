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
    nullable: true,
  })
  platform: string;

  @Column({
    default: null,
    nullable: true,
  })
  username: string;

  @Column({
    default: null,
    nullable: true,
  })
  avatar: string;

  @Column()
  create_time: Date;

  @Column()
  last_login: Date;

  @Column({
    default: null,
    nullable: true,
  })
  email: string;
}
