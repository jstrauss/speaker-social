/* requires a .env file in your source root with keys */
require('dotenv').load();

let rp = require('request-promise');
let Twitter = require('twitter');

let getTokenOptions, getSubmissionsOptions, oAuthToken;

oAuthToken = new Buffer(`${process.env.TWITTER_CONSUMER_KEY}:${process.env.TWITTER_CONSUMER_SECRET}`).toString('base64');

getTokenOptions = {
  method: 'POST',
  uri: 'https://api.twitter.com/oauth2/token',
  headers: {
    'Authorization': `Basic ${oAuthToken}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  body: 'grant_type=client_credentials',
  json: true
};

getSubmissionsOptions = {
  uri: 'https://www.papercall.io/api/v1/submissions',
  qs: {
    per_page: '500'
  },
  headers: { 'Authorization': process.env.PAPERCALL_KEY },
  json: true
};

/* Get a Twitter API token and the PaperCall submissions first,
 * as both are required to obtain follower counts from the
 * the API ('users/lookup') */
Promise.all([rp(getTokenOptions), rp(getSubmissionsOptions)])
  .then(function(results) {
    GetFollowers(results[0], results[1]);
  })
  .catch(function(error) {
    console.log(`Application error.\n${error.message}`);
  });


function GetFollowers(token, rawSubmissions) {
  if (!token.token_type === 'bearer') {
    throw new Error(`Twitter API error.\nExpected "bearer" token type but received "${token.token_type}" instead.`);
  }

  let uniqueSpeakers = [ ...new Set(rawSubmissions.map( s => s.profile.twitter )) ];

  let client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: token.access_token
  });

  client.get('users/lookup', {screen_name: uniqueSpeakers.join(',')})
    .then(function(response) {
      response.sort((a, b) => b.followers_count - a.followers_count).forEach(t => {
        console.log(`${t.name} (@${t.screen_name}): ${t.followers_count} followers`);
      });
      console.log();
    })
    .catch(function(error) {
      throw error;
    });
}
