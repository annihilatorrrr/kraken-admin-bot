import tr from "googletrans";

import { CommandController } from "./command.controller";
import { ExtendedContext } from "../../core/bot/context";
import { ALERT_ICON } from "../../utils/consts";

export class TranslateController extends CommandController {
    async handle(ctx: ExtendedContext): Promise<void> {
        if (!ctx?.message?.reply_to_message?.text) return;

        const language = ctx?.match?.[2] ?? "en";

        try {
            const result = await tr(ctx?.message?.reply_to_message?.text, language);

            await ctx.replyToMessage(`💬 *Translation* [${language.toUpperCase()}]\n\n_${result.text}_`, {
                parse_mode: "MarkdownV2",
            });
        } catch (e) {
            console.error(e);
            await ctx.replyToMessage(`${ALERT_ICON} Error while translating\. Please try again\.`);
        }
    }
}
