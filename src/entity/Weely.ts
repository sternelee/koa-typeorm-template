import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 周报

@Entity()
export default class Weekly {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cid: string; // 分类

  @Column()
  pid: string;

  @Column({
    nullable: true
  })
  date: string;

  @Column()
  title: string;

  @Column({
    nullable: true
  })
  title_cn: string;

  @Column({
    nullable: true
  })
  url: string;

  @Column({
    type: "text",
    nullable: true
  })
  content: string;

  @Column({
    type: "text",
    nullable: true
  })
  content_cn: string;
}
