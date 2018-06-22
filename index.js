var Twit = require('twit');

var T = new Twit({
  consumer_key:         process.env.EMBERTIMES_BOT_CONSUMER_KEY,
  consumer_secret:      process.env.EMBERTIMES_BOT_CONSUMER_SECRET,
  access_token:         process.env.EMBERTIMES_BOT_ACCESS_KEY,
  access_token_secret:  process.env.EMBERTIMES_BOT_ACCESS_SECRET,
});

var KEYWORDS = process.env.EMBERTIMES_BOT_KEYWORDS.split(":");

T.get('friends/list', function (err, data, response) {
  var users = data.users.map((user) => user.id_str);
  if (users) {
    var stream = T.stream('statuses/filter', { follow: users });
    startTweetStream(stream, users);
  }
});

function startTweetStream(stream, users) {
  console.log("Let's see what's happening on Twitter today....⏳")
  stream.on('tweet', function (tweet) {
      if (users.indexOf(tweet.user.id_str) > -1) {
          console.log(`${tweet.user.screen_name} just said: "${tweet.text}"`);
          var hashtagTexts = tweet.entities.hashtags.map((hashtag) => hashtag.text.toLowerCase());
          if (containsKeyWord(hashtagTexts)) {
            T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
              console.log(`Chirp, chirp 🐦! That sounded interesting, so I just retweeted that for you. 📣`);
            });
          } else {
            console.log('...hm, I\'m not talkative today.');
          }
      }
  });
}

function containsKeyWord(terms) {
  var keywords = KEYWORDS;
  return keywords.some((keyword) => terms.includes(keyword));
}
