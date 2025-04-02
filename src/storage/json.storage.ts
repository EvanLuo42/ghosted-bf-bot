import {StorageEngine} from "./interface.storage";

export type JsonOptions = {
  path: string
}

export class JsonStorage implements StorageEngine {
  constructor(options: JsonOptions) {
  }
}