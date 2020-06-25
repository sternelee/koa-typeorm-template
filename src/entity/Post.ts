import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 文章

@Entity()
export default class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pid: string;

  @Column({
    nullable: true
  })
  author: string;

  @Column({
    nullable: true
  })
  date: Date;

  @Column()
  title: string;

  @Column({
    nullable: true
  })
  title_cn: string;

  @Column({
    nullable: true
  })
  lead_image_url: string;

  @Column({
    nullable: true
  })
  word_count: number;

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
