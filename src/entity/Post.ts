import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

// 文章

@Entity()
export default class Post {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  pid: string

  @Column()
  author: string

  @Column()
  date: Date

  @Column()
  title: string

  @Column()
  title_cn: string

  @Column()
  lead_image_url: string

  @Column()
  word_count: number

  @Column()
  url: string

  @Column("text")
  content: string

  @Column("text")
  content_cn: string

}