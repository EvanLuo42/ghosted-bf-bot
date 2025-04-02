import {AtpAgent} from "@atproto/api";
import OpenAI from "openai";
import {APIClient} from "openai/core";
import {Options, StorageEngine, StorageTypeMap} from "./storage/interface.storage";
import {StorageFactory} from "./storage/factory.storage";

export type BskyOptions = {
  baseUrl: string
  username: string
  password: string
}

export type LLMOptions = {
  baseUrl: string
  apiKey: string
  model: string
}

export type StorageOptions<T extends keyof StorageTypeMap> = {
  type: T
  options: Options<T>
}

export type BotOptions<StorageType extends keyof StorageTypeMap> = {
  bsky: BskyOptions
  llm: LLMOptions
  storage: StorageOptions<StorageType>
}

export class Bot<StorageType extends keyof StorageTypeMap> {
  bskyAgent: AtpAgent
  llmClient: APIClient
  storage: StorageEngine
  options: BotOptions<StorageType>

  constructor(options: BotOptions<StorageType>) {
    this.options = options
    this.bskyAgent = new AtpAgent({
      service: options.bsky.baseUrl
    })
    this.llmClient = new OpenAI({
      baseURL: options.llm.baseUrl,
      apiKey: options.llm.apiKey
    })
    this.storage = StorageFactory.createStorage(options.storage)
  }

  public async post() {

  }

  private async _post(text: string) {
    await this.bskyAgent.login({
      identifier: this.options.bsky.username,
      password: this.options.bsky.password
    })
    await this.bskyAgent.post({text})
  }
}