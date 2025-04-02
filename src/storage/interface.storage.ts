import {SqliteOptions} from "./sqlite.storage";
import {JsonOptions} from "./json.storage";

export interface StorageEngine {

}

export type StorageType = 'sqlite' | 'json'

export type StorageTypeMap = {
  sqlite: SqliteOptions
  json: JsonOptions
}

export type Options<T extends keyof StorageTypeMap> = StorageTypeMap[T]