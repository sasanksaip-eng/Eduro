import { config } from 'dotenv'
config()
import { askAI } from './src/lib/api.js'

askAI("hello").then(console.log).catch(console.error)
