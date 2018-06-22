# Fanbot

---

## Get started

- Create a Twitter App that is associated with your bot account: https://apps.twitter.com/
- Note down your Access and Consumer Keys & Tokens from the `Keys and Access Tokens` tab
- Set those as environment variables in your `~/.bashrc` and `source ~/.bashrc`
- Set #hashtags that should trigger a retweet by defining the `KEYWORDS` env variable. Pass a list of
hashtags as a `:` separated string, e.g. `firsthashtag:somethingelse:pancakes`
- `yarn` it
- `node index.js` it
