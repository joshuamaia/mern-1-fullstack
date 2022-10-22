import {BelongsTo, Column, CreatedAt, ForeignKey, HasOne, Model, Table, UpdatedAt} from "sequelize-typescript";
import User from "./User";

@Table
class Todo extends Model {

  @Column
  title!:string

  @Column
  message!: string

  @Column
  active!: boolean

  @CreatedAt
  @Column({ field: 'created_at' })
  readonly createdAt?: Date;

  @UpdatedAt
  @Column({ field: 'update_at' })
  readonly updatedAt?: Date;

  @BelongsTo(() => User)
  role!: User;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  toJSON<Todo>(): Todo {
    const todo = super.toJSON();
    return todo;    
  }
}

export default Todo