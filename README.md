# ABRIO-case

## Startup

### Docker

Start
````bash
docker build -t abrio-case -f Dockerfile .
docker run -p 8080:8080 -d --name abrio abrio-case
````

Stop
````bash
docker stop abrio
docker rm abrio
````
