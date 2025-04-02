import * as dotenv from 'dotenv'
import * as process from "node:process";
import {Bot} from "./bot";
import {CronJob} from "cron";
import path from "node:path";

dotenv.config({ path: "../.env" })

const bot = new Bot({
  bsky: {
    baseUrl: "https://bsky.social",
    username: process.env.BLUESKY_USERNAME!,
    password: process.env.BLUESKY_PASSWORD!
  },
  llm: {
    baseUrl: "https://api.siliconflow.cn/v1",
    apiKey: process.env.LLM_API_KEY!,
    model: "Pro/deepseek-ai/DeepSeek-R1"
  },
  storage: {
    type: "text",
    options: {
      path: path.join(path.resolve(process.cwd(), '..'), 'posts.txt')
    }
  }
})

bot.post().then(() => null)

let job: CronJob

if (process.env.ENV === 'dev') {
  console.log("Currently in development mode")
  job = new CronJob(process.env.CRON_DEV!, () => bot.post())
} else if (process.env.ENV === 'prod') {
  console.log("Currently in prod mode")
  job = new CronJob(process.env.CRON_PROD!, () => bot.post())
} else {
  throw new Error("Environment definition not exist! Should be either dev or prod")
}

job.start()