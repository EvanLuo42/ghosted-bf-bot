import {StorageEngine} from "./interface.storage";

export type SqliteOptions = {
  url: string
}

export class SqliteStorage implements StorageEngine {
  constructor(options: SqliteOptions) {
  }
}