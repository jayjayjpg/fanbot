var Twit = require('twit');
const http = require('http');
const port = 8080;
const SERVER_POLL_INTERVAL = 15 * 60 * 1000; // every 15 minutes

const requestHandler = (request, response) => {
  console.log(request.url);
  response.end('Hello from the FanBot 👋');
};

const server = http.createServer(requestHandler)

server.listen(process.env.PORT || 8080, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
  setTimeout(startHanging, 1000);
  keepServerAlive();
});

var T = new Twit({
  consumer_key:         process.env.EMBERTIMES_BOT_CONSUMER_KEY,
  consumer_secret:      process.env.EMBERTIMES_BOT_CONSUMER_SECRET,
  access_token:         process.env.EMBERTIMES_BOT_ACCESS_KEY,
  access_token_secret:  process.env.EMBERTIMES_BOT_ACCESS_SECRET,
  tweet_mode : 'extended',
});

var KEYWORDS = process.env.EMBERTIMES_BOT_KEYWORDS.split(":");

function startHanging() {
  T.get('friends/list', function (err, data, response) {
    if (err) {
      return console.log('err', err);
    }
    var users = data.users ? data.users.map((user) => user.id_str) : null;
    if (users) {
      var stream = T.stream('statuses/filter', { follow: users, tweet_mode : 'extended' });
      startTweetStream(stream, users);
    }
  });
}

function startTweetStream(stream, users) {
  console.log("Let's see what's happening on Twitter today....⏳")
  stream.on('tweet', function (tweet) {
      if (users.indexOf(tweet.user.id_str) > -1) {
          var text = tweet.extended_tweet ? tweet.extended_tweet.full_text : tweet.text;
          console.log(`${tweet.user.screen_name} just said: "${text}"`);
          if (containsKeyWord(text)) {
            T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
              console.log(`Chirp, chirp 🐦! That sounded interesting, so I just retweeted that for you. 📣`);
            });
          } else {
            console.log('...hm, I\'m not talkative today.');
          }
      }
  });

  stream.on('disconnect', function (disconnectMessage) {
      console.log(disconnectMessage);
  });

  stream.on('reconnect', function (request, response, connectInterval) {
      console.log('Reconnecting in ' + connectInterval + 'ms...');
  })

  stream.on('error', function(error) {
      console.log(error);
  });
}

function containsKeyWord(fullText) {
  var keywords = KEYWORDS.map((word) => word.toLowerCase());
  var text = fullText.toLowerCase();
  return keywords.some((keyword) => text.includes(`#${keyword}`) || text.includes(`@${keyword}`));
}

function keepServerAlive() {
  setInterval(function() {
    console.log('polling....');
    http.get('http://embertimesfanbot.herokuapp.com');
  }, SERVER_POLL_INTERVAL);
}
