import {StorageEngine} from "./interface.storage";

export type JsonOptions = {
  path: string
}

export class JsonStorage implements StorageEngine {
  path: string

  constructor(options: JsonOptions) {
    this.path = options.path
  }

  push(time: Date, text: string): void {

  }

  get(): string {
    return "";
  }
}