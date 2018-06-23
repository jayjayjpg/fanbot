# Fanbot

---

## Get started

- Create a Twitter App that is associated with your bot account: https://apps.twitter.com/
- Note down your Access Token & Access Secret, as well as your Consumer Keys & Tokens from the `Keys and Access Tokens` tab
- Provide #hashtags that should trigger a retweet by defining the `EMBERTIMES_BOT_KEYWORDS` env variable.
Pass a list of hashtag keywords as a `:` separated string, e.g. `firsthashtag:somethingelse:pancakes`
- Set keys, token, secrets and the keywords you want to track as environment variables in your `~/.bashrc`

```bash
# Example .bashrc

export EMBERTIMES_BOT_CONSUMER_KEY="someconsumerkeyhere"
export EMBERTIMES_BOT_CONSUMER_SECRET="someconsumersecrethere"
export EMBERTIMES_BOT_ACCESS_KEY="someaccessTOKENhere"
export EMBERTIMES_BOT_ACCESS_SECRET="someaccesssecrethere"
export EMBERTIMES_BOT_KEYWORDS="all:your:keywords:you:wanna:track"


```
- `source ~/.bashrc` it
- `yarn` it
- `npm start` it
