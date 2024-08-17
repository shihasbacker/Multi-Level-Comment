import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Comment } from "./Comment";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
