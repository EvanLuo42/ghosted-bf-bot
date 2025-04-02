import * as dotenv from 'dotenv'
import * as process from "node:process";
import {Bot} from "./bot";
import {CronJob} from "cron";

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
    type: "json",
    options: {
      path: "../posts.json"
    }
  }
})

const scheduleExpressionMinute = '* * * * *'
const scheduleExpress = '0 */3 * * *'

let job: CronJob

if (process.env.ENV! === 'test') {
  job = new CronJob(scheduleExpressionMinute, bot.post)
} else if (process.env.ENV! === 'prod') {
  job = new CronJob(scheduleExpress, bot.post)
} else {
  throw new Error("Environment definition not exist! Should be either test or prod")
}

job.start()