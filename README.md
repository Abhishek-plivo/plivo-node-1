# plivo-node

[![Build Status](https://travis-ci.org/plivo/plivo-node.svg?branch=4.0)](https://travis-ci.org/plivo/plivo-node)
[![PyPI](https://img.shields.io/pypi/v/plivo.svg)](https://pypi.python.org/pypi/plivo)
[![PyPI](https://img.shields.io/pypi/pyversions/plivo.svg)](https://pypi.python.org/pypi/plivo)
[![PyPI](https://img.shields.io/pypi/l/plivo.svg)](https://pypi.python.org/pypi/plivo)


The Node SDK makes it simpler to integrate communications into your Node applications using the Plivo REST API. Using the SDK, you will be able to make voice calls, send SMS and generate Plivo XML to control your call flows.

## Installation
Install the SDK using [npm](https://www.npmjs.com/package/plivo)

    npm install --save plivo

If you have the `0.4.1` version (a.k.a legacy) already installed, you will have to first uninstall it before installing the new version. `npm update plivo` might not work depending on your system status.

## Getting started

### Authentication
To make the API requests, you need to create a `Client` and provide it with authentication credentials (which can be found at [https://manage.plivo.com/dashboard/](https://manage.plivo.com/dashboard/)).

We recommend that you store your credentials in the `PLIVO_AUTH_ID` and the `PLIVO_AUTH_TOKEN` environment variables, so as to avoid the possibility of accidentally committing them to source control. If you do this, you can initialise the client with no arguments and it will automatically fetch them from the environment variables:

```javascript
let plivo = require('plivo');

let client = new plivo.Client();
```
Alternatively, you can specifiy the authentication credentials while initializing the `RestClient`.

```javascript
let plivo = require('plivo');

let client = new plivo.Client('PLIVO_AUTH_ID', 'PLIVO_AUTH_TOKEN');
```

If you expect to make a large number of API requests, re-use the same client instance, but if you expect to create a client on an on-demand basis, you can use a context manager to automatically frees all resources used by the client

```javascript
let plivo = require('plivo');

// with plivo.RestClient() as client:
//   pass # Do something with the client

```

### The basics
The SDK uses consistent interfaces to create, retrieve, update, delete and list resources. The pattern followed is as follows:

```javascript
let plivo = require('plivo');

let client = new plivo.Client();

client.applications.create(name,params); //create
client.applications.get(id); //retrieve
client.applications.update(params); //update
client.numbers.list({limit:5,offset:0}); //list
client.applications.delete(id); // delete

// applications,accounts,numbers are
// collectively referred as resources
```


Also, using `client.resources.list()` would list the first 20 resources by default (which is the first page, with `limit` as 20, and `offset` as 0). To get more, you will have to use `limit` and `offset` to get the second page of resources.

To list all resources, you can simply use the following pattern that will handle the pagination for you automatically, so you won't have to worry about passing the right `limit` and `offset` values.

## Examples

### Send a message

```javascript

let plivo = require('plivo');

let client = new plivo.Client();

client.mesages.create(
  '1231231231', // Source number
  '3213213213', // Destination number
  'Test Message', // Text
);

```

### Make a call

```javascript
let plivo = require('plivo');

let client = new plivo.Client();

client.calls.create(
  '1231231231', // From
  '3213213213', // To
  'http://answer.url', // Answer URL
);

```

### Generate Plivo XML

```javascript
let Response = require('plivo/utils/plivoxml');

let response = new Response();

let speak_body = "Go Green, Go Plivo.";

response.addSpeak(speak_body);

console.log(response.toXML());
```

This generates the following XML:

```xml
<Response>
    <Speak>Go Green, Go Plivo.</Speak>
</Response>
```

### More examples
Refer to the [Plivo API Reference](https://api-reference.plivo.com/latest/node/introduction/overview) for more examples. Also refer to the [guide to setting up dev environment](https://developers.plivo.com/getting-started/setting-up-dev-environment/) on [Plivo Developers Portal](https://developers.plivo.com) to setup a Node Express server & use it to test out your integration in under 5 minutes. to get started with Node.

## Reporting issues
Report any feedback or problems with this beta version by [opening an issue on Github](https://github.com/plivo/plivo-node/issues).
