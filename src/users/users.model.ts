import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  Unique,
} from 'sequelize-typescript';
import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  static findById(secondUserId: number | undefined) {
    throw new Error('Method not implemented.');
  }
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare username: string;

  @AllowNull(true)
  @Unique
  @Column(DataType.STRING)
  declare email?: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare totalPoints: CreationOptional<number>;

}
