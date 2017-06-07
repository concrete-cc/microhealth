# microhealth

[![Build Status](https://travis-ci.org/concrete-cc/microhealth.svg?branch=master)](https://travis-ci.org/concrete-cc/microhealth)

A Node.js module for simple health checking. Originally created to add health checks to microservices deployed to our Kubernetes cluster.

## Getting started

First, install microhealth using npm:
```
    npm i microhealth
```
Then, require the package and use it like so:
```js
    const health = require('microhealth')

    health.register(() => Promise.resolve())
    health.check()
      .then(() => console.log('Healthy!'))
      .catch(() => console.error('Health check failed!'))
```
## API

### `.register(cb)`
Register a health check. This should be a promise which will resolve if check passes
or rejects if the check failed.

### `.check()`
Run all checks. Returns a promise. If they all pass will resolve and if any check fails will reject.

### `.route()`
Returns connect/express middleware. Will run `.check()` and send `200` response if 
all checks pass and `500` if any check fails.

### `.getChecks()`
Returns an array of all registered health checks.

### `.reset()`
Clears all health checks. Used for testing. Normally you would not call this directly.

## Contributing

To report bugs or request features, submit issues here on GitHub, [concrete-cc/microhealth/issues](https://github.com/concrete-cc/microhealth/issues). Pull requests are also welcome.

## License

MIT
