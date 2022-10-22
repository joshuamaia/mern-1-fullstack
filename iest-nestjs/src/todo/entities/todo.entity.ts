import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column()
  active?: boolean;

  @ManyToOne(() => User)
  user: User;

  @Expose()
  get nameAndRole() {
    return `${this.title} - ${this.message}`;
  }
}
