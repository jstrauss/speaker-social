# Speaker Social Media Review

## Purpose

This is a very simple application that I threw together to assist in
reviewing submissions for the [Kansas City Developer
Conference](http://www.kcdc.info "KCDC 2017") (KCDC) 2017 event. We may
add additional features in time, but for now, it is a basic node.js
application that pulls from remote third-party APIs to get a sense of
reach and industry clout for presenters who are currently unknown to us.

So long as you have the appropriate third-party accounts and API keys,
you can use this for your own purposes.

## Environment

This application was built using `node@6.9.4` and `npm@4.3.0`. Earlier
versions of node.js may work, but this has not been tested. Variables
are block-scoped using `let` declarations, which is an unsupported
feature in pre-`v6.x` versions of node.

There is no build process associated, and therefore, no reliance upon
gulp, grunt, webpack, babel, or any other specific build tools. You
really just need node and npm.

## Required API Access

In order to run this application, you will need valid accounts and
access keys for the following:

- [PaperCall.io](http://www.papercall.io)
- [Twitter Developer](http://dev.twitter.com)

The application is utilizing [Application-only
authentication](http://dev.twitter.com/oauth/application-only "OAuth 2
Documentation") from Twitter's API and does not support user-token
access or the specific API endpoints that use it. This means that you
will need a registered Twitter application and a valid Consumer Key and
Consumer Secret.

All required base64 encoding and retrieval of a bearer token for the
Twitter API are handled by the application.

## Setup

Clone the repository to your local machine from:

```bash
$ git clone git@github.com:jstrauss/speaker-social.git
```

Install dependencies from npm:

```bash
$ cd src
$ npm install
```

### Required metadata

The application depends upon, and will install, the `dotenv` npm
package. This is used to load environment variables for the application.
You will need to create a new `src/.env` file in your local repository
or else you will get errors at runtime. This file is already excluded
from git in the `.gitignore` file. It must contain at least the
following:

```bash
// .env

TWITTER_CONSUMER_KEY=<your Twitter consumer key>
TWITTER_CONSUMER_SECRET=<your Twitter consumer secret>
PAPERCALLKEY=<your PaperCall.io API key>
```

So long as the `.env` file is in place, you can run the application:

```bash
$ npm start
```

## Limitations

The application currently limits retrieval to 500 total submissions. This
can be modified, up to any underlying API limitations from PaperCall.io, by
changing the `per_page` query string paramater at line 25 of
`speakers.js`.

The API call to Twitter (`users/lookup.json`) allows no more than 100
username lookups in a single call, and is rate-limited to 900 requests
per 15-minute window. Additional documentation on the Twitter API call
can be found
[here](http://dev.twitter.com/rest/reference/get/users/show).

## Feedback

Suggestions/improvements are
[welcome and encouraged](https://github.com/jstrauss/speaker-social/issues)!

## Author

| [![twitter/jeffreystrauss](http://gravatar.com/avatar/b06d474fb0c5bb9d62fee08782c75d14?s=70)](http://twitter.com/jeffreystrauss "Follow @jeffreystrauss on Twitter") |
|---|
| [Jeff Strauss](http://twitter.com/jeffreystrauss/) |
