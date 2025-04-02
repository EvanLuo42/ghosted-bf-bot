import {StorageOptions} from "../bot";
import {StorageEngine, StorageTypeMap} from "./interface.storage";
import {JsonOptions, JsonStorage} from "./json.storage";
import {SqliteOptions, SqliteStorage} from "./sqlite.storage";
import {TextOptions, TextStorage} from "./text.storage";

export class StorageFactory {
  static createStorage<T extends keyof StorageTypeMap>(options: StorageOptions<T>): StorageEngine {
    switch (options.type) {
      case "json":
        return new JsonStorage(options.options as JsonOptions)
      case "sqlite":
        return new SqliteStorage(options.options as SqliteOptions)
      case "text":
        return new TextStorage(options.options as TextOptions)
    }
  }
}