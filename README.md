# databox-statsd

This is [statsd] backend for [Databox].

## Installing

Change statsd `config.js`:

```javascript
{
	// ...
	backends: [
						"./backends/graphite",
						".<path to this repo>/databox-statsd.js",
	]
}
```

## Development

Simplest way to develop and debug [databox-statsd] is to boot-up [docker-graphite-statsd] Docker image w/ [Graphite] and [statsd] already setup. Then start another local statsd daemon with [databox-statsd] already loaded,...

    # Build docker-graphite-statsd image
    docker build -t graphite .
    # Run it,...
    docker run -d --name graphite -p 80:80 -p 2003:2003 -p 8125:8125/udp graphite

## Contribution & Licence

- [Oto Brglez](https://github.com/otobrglez)
... comes with [MIT](LICENSE),..

[statsd]: https://github.com/etsy/statsd
[Databox]: http://databox.com
[docker-graphite-statsd]: https://github.com/hopsoft/docker-graphite-statsd
[Graphite]: http://graphite.readthedocs.org/en/latest/
