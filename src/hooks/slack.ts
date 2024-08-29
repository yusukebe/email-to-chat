import { Email } from 'postal-mime'

type SlackPayload = {
  text: string
  username?: string
  icon_emoji?: string
  icon_url?: string
  channel?: string
  blocks?: any[]
  attachments?: any[]
}

export const slackHook = async (email: Email, env: CloudflareBindings) => {
  const payload: SlackPayload = {
    text: email.text!,
  }

  const res = await fetch(env.SLACK_WEB_HOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return res.ok
}
