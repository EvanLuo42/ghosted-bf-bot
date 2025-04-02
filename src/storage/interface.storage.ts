import {SqliteOptions} from "./sqlite.storage";
import {JsonOptions} from "./json.storage";
import {TextOptions} from "./text.storage";

export interface StorageEngine {
  push(time: Date, text: string): void
  get(): string
}

export type StorageTypeMap = {
  sqlite: SqliteOptions
  json: JsonOptions
  text: TextOptions
}

export type Options<T extends keyof StorageTypeMap> = StorageTypeMap[T]