import { JSONFileSync, LowSync } from 'lowdb'
import mkdirp from 'mkdirp'
import { resolve } from 'path'

mkdirp(resolve(__dirname, '../../live'))

// Use JSON file for storage
const file = resolve(__dirname, '../../live/db.json')
const adapter = new JSONFileSync(file)

export const db = new LowSync(adapter)

// Seed an empty DB
db.defaults({
  users: [],
  roles: [],
  permissions: []
}).write()
