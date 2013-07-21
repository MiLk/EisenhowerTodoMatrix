# Eisenhower Todo Matrix

This HTML & Javascript application allow you to organize your tasks and stop waste your time.

The Eisenhower Matrix is one of the simplest tools that can quickly make you a lot better at managing your time.

This version use AngularJS client-side and the persistence is provided by a CouchDB server. There is no server application or API, except for the CouchDB built-in API.

## Configuring CouchDB

To use CouchDB 1.3 with jQuery, you have to enable CORS feature in config.

Prior to 1.3, CORS is not available, so you can use a `cors-proxy` <https://github.com/gr2m/CORS-Proxy>.

``` javascript
var cors_proxy = require("corsproxy");
var http_proxy = require("http-proxy");
cors_proxy.options = {
     target: "http://127.0.0.1:5984"
};
http_proxy.createServer(cors_proxy).listen(5984,'your_ip');
```

You have to create the database and the view:
```
curl -i -X PUT http://my.couchdb.server:5984/eisenhower
curl -i -X PUT http://my.couchdb.server:5984/eisenhower/_design/users -d @couchdb/users.json

```

## Configuring Application

Just modify the `api_url` variable in `js/app.js`.

## Usage

Just open the HTML file in your browser. (Must be served via http protocole and not file://).

## License

The MIT License (MIT)

Copyright (c) 2013 Emilien Kenler <hello@emilienkenler.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
