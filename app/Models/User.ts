import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { Role } from 'app/Models/Role';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public login: string

  @column({ serializeAs: null })
  public password: string

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
