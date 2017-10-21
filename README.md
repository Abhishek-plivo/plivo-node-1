# Python Node.js Helper SDK

**Note**: `Bleeding edge: Use with caution`

## Installation

Install using:

    npm install plivo

### Authentication:

To make requests, you create a `Client` and provide it authentication credentials (which can be found at  https://manage.plivo.com/dashboard/).

We recommend that you store your credentials in the `PLIVO_AUTH_ID` and the `PLIVO_AUTH_TOKEN` environment variables, so as to avoid the possibility of accidentally committing them to source control. If you do this, you can initialise the client with no arguments and it will automatically fetch them from the environment variables:

```javascript
var plivo = require('plivo');
var client = new plivo.Client();
```

Alternatively, you can provide these to `Client`'s constructor yourself:

```javascript
var plivo = require('plivo');
var client = new plivo.Client('<insert your authentication ID here>', '<insert your authentication token here>');
```

If you are making several requests to Plivo's API, please re-use the same client instance for maximum efficiency.

## The Basics

To send a message:

```javascript
var plivo = require('plivo');
var client = new plivo.Client();
client.mesages.create(
  '1231231231', // Source number
  '3213213213', // Destination number
  'Test Message', // Text
);
```

To make a call

```javascript
var plivo = require('plivo');
var client = new plivo.Client();
client.calls.create(
  '1231231231', // From
  '3213213213', // To
  'http://answer.url', // Answer URL
);
```

To generate XML:
```javascript
var Response = require('plivo/utils/plivoxml');
var resp = new Response();
resp.addSpeak('Hello World, from Plivo!');
console.log(resp.toXML());
```
