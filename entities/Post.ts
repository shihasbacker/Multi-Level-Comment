import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Comment } from "./Comment";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;  

  @Column()
  content: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
