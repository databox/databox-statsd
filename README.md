# databox-statsd

Pluggable backend for [StatsD][statsd], which publishes stats to [Databox].

[![Build Status](https://travis-ci.org/databox/databox-statsd.svg)](https://travis-ci.org/databox/databox-statsd)

## Installing

Change statsd `config.js`:

```javascript
{
    backends: [
        "./backends/graphite",
        ".<path to this repo>/databox-statsd.js",
    ],
    // ...
}
```

## Development

Simplest way to develop and debug [databox-statsd] is to boot-up [docker-graphite-statsd] Docker image w/ [Graphite] and [statsd] already setup.
Then start another local statsd daemon with [databox-statsd] already loaded,...

    # Build docker-graphite-statsd image
    git clone https://github.com/hopsoft/docker-graphite-statsd.git
    docker build -t graphite .
    # Run it,...
    docker run -d --name graphite -p 80:80 -p 2003:2003 -p 8125:8125/udp graphite
    
    # In another terminal start statsd w/ databox-statsd
    node stats.js config.js

## Contribution & Licence

- [Oto Brglez](https://github.com/otobrglez)
... comes with [MIT](LICENSE),..

[statsd]: https://github.com/etsy/statsd
[Databox]: http://databox.com
[docker-graphite-statsd]: https://github.com/hopsoft/docker-graphite-statsd
[Graphite]: http://graphite.readthedocs.org/en/latest/
[databox-statsd]: https://github.com/databox/databox-statsd
