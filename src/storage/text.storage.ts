import {StorageEngine} from "./interface.storage";
import * as fs from "node:fs";

export type TextOptions = {
  path: string
}

export class TextStorage implements StorageEngine {
  path: string

  constructor(options: TextOptions) {
    this.path = options.path
  }

  get(): string {
    return fs.readFileSync(this.path, 'utf-8');
  }

  push(time: Date, text: string): void {
    fs.appendFile(this.path, `${time}:${text}\n`, (err) => {
      if (err != null) {
        throw new Error(err?.message)
      }
    })
  }
}