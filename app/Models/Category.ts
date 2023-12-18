import {BaseModel, column, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Movie from "App/Models/Movie";

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @hasMany(() => Movie)
  public movies: HasMany<typeof Movie>;
}