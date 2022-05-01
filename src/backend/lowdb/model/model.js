import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

export class Lowdb {
  name
  constructor(name) {
    this.name = name
  }

  async connect() {
    const filePath = join(dirname(fileURLToPath(import.meta.url)), `./db/${this.name+".json"}`)
    const jsonDB = await new Low(new JSONFile(filePath))
    await jsonDB.read()
    return jsonDB
  }
}
