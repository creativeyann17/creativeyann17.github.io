# Introduction

Whatever you use **spring-boot** or **micronaut** the most common way to run you API is to do the well known commands:

- mvn clean install
- java -jar target/your-api.jar

It's true using JAVA can justify that the local behavior your have during your tests will be the same as production but it's not guaranty and so will performance.

Using **containers** is a good way to encapsulate your **API** where the OS/Security/Configurations and other settings will remain the same between integration tests and production execution.

This articles explains how to create and run a **Docker Image** of your favorite API Framework.

# Docker

## Installation

The installation depends of your OS, please follow this link to proceed: [Get Docker](https://docs.docker.com/get-docker/).

**Note:** On linux you may have to use **sudo** to execute docker commands.

## Dockerfile

The **Dockerfile** contains set of instructions to describe both build and execution of the **Docker Image** like below:

```console
FROM adoptopenjdk/openjdk11:alpine-slim
COPY target/creativeyann17-github-api-*.jar api.jar
EXPOSE 8080 8443
CMD java ${JAVA_OPTS} -jar api.jar
```

Explanations:

- FROM => specify the image your container will be based on, you can find all possible image here : [Docker Hub](https://hub.docker.com/search?q=&type=image). In our case we use a **OpenJDK 11 slim** image for low memory footprint and performance
- COPY => when building the **container** this instruction will add files from our local folder
- EXPOSE => allow ports 8080 and 8443 to be accessible when the **container** will run
- CMD => what to do when the **container** is started

## Build image

Now that our **Dockerfile** is done we can build the **image** like this:

```
docker build .
```

**Note:** you can specify a **tag** for you image with _-t my_image_tag_

The command should display step by step the creation of the **image** ending with a _Successfully built_ followed by the newly built **image ID**:

```console
Sending build context to Docker daemon  36.68MB
Step 1/4 : FROM adoptopenjdk/openjdk11:alpine-slim
 ---> 88844d620c91
Step 2/4 : COPY target/creativeyann17-github-api-*.jar api.jar
 ---> 7b555425f5e2
Step 3/4 : EXPOSE 8080 8443
 ---> Running in 3147d2344170
Removing intermediate container 3147d2344170
 ---> dd9f6b5db33e
Step 4/4 : CMD java ${JAVA_OPTS} -Dmicronaut.environments=local -jar api.jar
 ---> Running in eeea834590ae
Removing intermediate container eeea834590ae
 ---> 8fbce0678a8a
Successfully built 8fbce0678a8a
```

## Run image

We can now use the **image ID** to run it, all outputs messages will be displayed in the console and you can exit the execution with _CTRL + C_ at any time:

```
docker run 8fbce0678a8a
```

You may have noticed that we passed a **${JAVA_OPTS}** in our **Dockerfile**. It's an example how to pass environment variables:

```
docker run --env JAVA_OPTS=-Dmicronaut.environments=local 8fbce0678a8a
```

# List and clean images

All of this is nice but building **images** is using disk-space, it's important to manage them by removing old un-used builds:

First list of the existing **images**:

```
docker images
```

```console
REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
<none>                   <none>              cf23413ebfe9        16 minutes ago      296MB
<none>                   <none>              8fbce0678a8a        18 minutes ago      296MB
<none>                   <none>              2abb21a67d5a        11 days ago         294MB
test                     latest              cdfa002d7e58        11 days ago         183MB
<none>                   <none>              5a4abbbabf28        11 days ago         183MB
<none>                   <none>              51a7792210c0        11 days ago         183MB
adoptopenjdk/openjdk11   alpine-jre          0643e2c34727        2 weeks ago         150MB
adoptopenjdk/openjdk11   alpine-slim         88844d620c91        2 weeks ago         261MB
```

Then you can remove the one you desire like this:

```
docker rmi <image_id_1> <image_id_2> ...
```

**Note:** You can use _--force , -f_ in case the previous command failed.

```console
Deleted: sha256:cf23413ebfe99ff09c85ca969280d769963095c9b72189665231c48b2505888c
Deleted: sha256:8fbce0678a8ade594991146b4ce4f88811f6a035d098014e861b3b37f3daa316
Deleted: sha256:dd9f6b5db33ed0cb7cc09277309c23481fa90505be3f369de438a9f53ce815e7
Deleted: sha256:7b555425f5e2d6a7012fb1bbcdd7ae8ab9b873fe3a6ea15f1a5c01909b6db431
Deleted: sha256:2abb21a67d5a550b7ba1e514eb6fb47d11568adecae1b8be5ca183014a27e43f
Deleted: sha256:031872b4046fdf2bf6fb1cefd5ab5afe2b65ade16177b7a1e629ec1d0a0cd258
Deleted: sha256:8966a7a8e2da301a3f39759f0ee8efb3c02ba6ab246f90383a1c3d007144b52a
Untagged: test:latest
Deleted: sha256:cdfa002d7e582bfb9673d6832fef874812b6327e9cbf7dcc345983e35f71aa21
Deleted: sha256:5a4abbbabf28e81793a180908ac2c9d2dc7eae5e791344137413db48061cec57
Deleted: sha256:8e4594712141ccf32f8019f9fa81f70267aaa6eeafb7e62622faf8517f0c9882
Deleted: sha256:51a7792210c0a942982c20533502f43ee4b7d4eef7024931871ad8cfd6b9528d
Deleted: sha256:b05d8e41747875fc6fd26d13592862a9f353ea6a125cedc9e7536409ea7a942e
Deleted: sha256:92692d888a589454fcf5a149092c32dc2ce4e6ad1fc6cdc0323af4f843c92f8f
Untagged: adoptopenjdk/openjdk11:alpine-jre
Untagged: adoptopenjdk/openjdk11@sha256:56ccdcd5880803a3c0a66a3b1ae9fe6c2818882c17638d975961ee933d98b07b
Deleted: sha256:0643e2c34727635824cf89739f715ce77e7a742974e1425577a8151bf567e9c2
```

# Conclusion

Hope this article was useful, we may add more stuff in the future because **Docker** is a big subject.
