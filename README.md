# databox-statsd

Pluggable backend for [StatsD][statsd], which publishes stats to [Databox].

[![Build Status](https://travis-ci.org/databox/databox-statsd.svg)](https://travis-ci.org/databox/databox-statsd)

## Installing and usage

Clone this repository,...

    git clone https://github.com/databox/databox-statsd.git
    cd databox-statsd
    npm install --production

In [statsd] directory update `config.js` with your Databox token:

```javascript
{
    databox: {
        push_token: '<Databox push token>'
    },
    backends: [
        "./backends/graphite",
        "... path to databox-statsd ... /databox-statsd.js",
    ],
    // ...
}
```

Pushing data to [statsd]:

    # Counter example
    echo "databox.counters.example:100|c" | nc -u -w0 127.0.0.1 8125

    # Timer example
    echo "upload.timer:600|ms|@0.1" | nc -u -w0 127.0.0.1 8125

[databox-statsd] currently supports **only** `counters` and `timers.

## Development

Simplest way to develop and debug [databox-statsd] is to boot-up [docker-graphite-statsd] Docker image w/ [Graphite] and [statsd] already setup.
Then start another local statsd daemon with [databox-statsd]:

    # Build docker-graphite-statsd image
    git clone https://github.com/hopsoft/docker-graphite-statsd.git
    docker build -t graphite .
    # Run it,...
    docker run -d --name graphite -p 80:80 -p 2003:2003 -p 8125:8125/udp graphite

    # In another terminal start statsd w/ databox-statsd
    node stats.js config.js

## Contribution & Licence

- [Oto Brglez](https://github.com/otobrglez)
- and it comes with [MIT](LICENSE).

[statsd]: https://github.com/etsy/statsd
[Databox]: http://databox.com
[docker-graphite-statsd]: https://github.com/hopsoft/docker-graphite-statsd
[Graphite]: http://graphite.readthedocs.org/en/latest/
[databox-statsd]: https://github.com/databox/databox-statsd
