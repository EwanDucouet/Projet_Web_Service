import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import { belongsTo } from "@adonisjs/lucid/build/src/Orm/Decorators";
import Category from "App/Models/Category";

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public description: string;

  @column.dateTime()
  public release: DateTime;

  @column()
  public note: number;

  @belongsTo(() => Category)
  public categories: BelongsTo<typeof Category>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}

module.exports = Movie;