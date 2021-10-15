const { NODE_ENV } = process.env;

if (NODE_ENV !== "production") require("dotenv").config();

import { GrammyError, HttpError } from "grammy";

import bot from "./core/bot";
import { Launch } from "./utils/launch";

import actions from "./controllers/actions";
import commands from "./controllers/commands";
import events from "./controllers/events";

bot.use(commands);
bot.use(actions);
bot.use(events);

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});

NODE_ENV === "development" ? Launch.development(bot) : Launch.production(bot);

export {};
