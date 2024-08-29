import PostalMime from 'postal-mime'
import { slackHook } from './hooks/slack'

export default {
  async email(message, env) {
    const allowList = env.ALLOW_LIST as string[]
    if (!allowList.includes(message.from)) {
      return message.setReject('Address not allowed')
    }

    const parser = new PostalMime()
    const email = await parser.parse(message.raw)

    await slackHook(email, env)
  },
} satisfies ExportedHandler<CloudflareBindings>
