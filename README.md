# Eisenhower Todo Matrix

This HTML & Javascript application allow you to organize your tasks and stop waste your time.

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

You have to create an empty database with the following document:
``` json
{
   "UI": [
   ],
   "NUI": [
   ],
   "UNI": [
   ],
   "NUNI": [
   ],
   "done": [
   ]
}
```
