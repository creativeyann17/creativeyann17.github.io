# Introduction

In this article we are exploring a solution to manage the complexity of working with a local environment with your custom data while writing your code.

## The problematic

Most of the time companies will provide `installation guide` and maybe `setup scripts` to manage this part for you. If it's not the case or maybe you prefer to build you own local env as an exercise to better understand and control the architecture, data, components within your project then this solution is for you. 

# Docker-compose

Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. 

## Installation

Please follow the officials installation instructions to install both `docker` and `docker-compose` [here](https://docs.docker.com/compose/install)

# The localstack project

You can download an example of the `localstack` project [here](https://github.com/creativeyann17/localstack-docker-compose). 

## Files structure

- `data/` where the docker images will read/write data
- `init/` scripts/files to populate your data
- `docker-compose.yml`  list of docker images that compose your localstack
- `localstack.sh` set of commands to run the localstack

## Execution

```
> ./localstack

localstack-docker-compose

Usage:
  sh ./localstack.sh [COMMAND]
  ./localstack.sh [COMMAND] (requires chmod +x ./localstack.sh)

Commands:
  start         Init then start the localstack
  status        Show localstack status
  stop          Stop the localstack
  restart       Stop then Start the localstack
```
