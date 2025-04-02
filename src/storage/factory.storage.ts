import {StorageOptions} from "../bot";
import {StorageEngine, StorageTypeMap} from "./interface.storage";
import {JsonStorage} from "./json.storage";
import {SqliteStorage} from "./sqlite.storage";

export class StorageFactory {
  static createStorage<T extends keyof StorageTypeMap>(options: StorageOptions<T>): StorageEngine {
    switch (options.type) {
      case "json":
        return new JsonStorage(options.options)
      case "sqlite":
        return new SqliteStorage(options.options)
    }
  }
}