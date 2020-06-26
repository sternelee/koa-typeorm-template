import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 用户

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column({
    nullable: true,
  })
  platform: string;

  @Column({
    nullable: true,
  })
  username: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column()
  create_time: Date;

  @Column({
    nullable: true
  })
  last_login: Date;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    default: "",
    type: "text"
  })
  tags: string;

  @Column({
    default: "",
    type: "text"
  })
  pubs: string;

  @Column({
    default: "",
    type: "text"
  })
  favs: string;
}
