import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'movies'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("category").references('id').inTable('categories').onDelete('CASCADE');
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
