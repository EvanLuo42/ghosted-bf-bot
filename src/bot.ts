import {AtpAgent} from "@atproto/api";
import OpenAI from "openai";
import {Options, StorageEngine, StorageTypeMap} from "./storage/interface.storage";
import {StorageFactory} from "./storage/factory.storage";
import * as fs from "node:fs";
import path from "node:path";

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
  llmClient: OpenAI
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
    if (!this.llmClient) {
      throw new Error("LLM client or chat is not initialized.");
    }
    const completion = await this.llmClient.chat.completions.create({
      model: this.options.llm.model,
      messages: [
        { role: 'system', content: this.readInstruction() },
        { role: 'user', content: this.storage.get() }
      ]
    })
    await this._post(completion.choices[0].message.content!)
    this.storage.push(new Date(), completion.choices[0].message.content!)
    console.log(`Posted a post: ${completion.choices[0].message.content!}`)
  }

  private readInstruction() {
    return fs.readFileSync(path.join(path.resolve(process.cwd(), '..'), 'instruction_prompt.txt'), 'utf-8')
  }

  private async _post(text: string) {
    await this.bskyAgent.login({
      identifier: this.options.bsky.username,
      password: this.options.bsky.password
    })
    await this.bskyAgent.post({text})
  }
}