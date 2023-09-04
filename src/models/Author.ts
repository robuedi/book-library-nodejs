import { Table, Model, Column, DataType } from "sequelize-typescript";
import IAuthor from './author.shape';

@Table({
  timestamps: true,
  tableName: "authors",
})
export default class Author extends Model implements  IAuthor {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;
}