# Introduction

**Cloud** is kind of trending this days and for goods reasons. As a developer you have the possibility to only focus on _code_ and know that all the hardware, security, backups, databases, scaling ... will be managed for you. There are several big **Cloud** services providers, first let's try **Google Cloud**.

# Google Cloud

## Create an account

You need to create an account in order to be able to deploy, as of today (2012/03/28) a free 90 days trial account is available:

[Create an account](https://console.cloud.google.com)

**Note:** Google will ask your credit-card information to avoid people trying to have duplicated free trail accounts but unless you switch explicitly to
billable plan, no money will be withdraw from your bank account.

## Install the SDK

Depending what your OS is you have different way to install the SDK, please follow the link below:

[Install SDK](https://cloud.google.com/sdk/install)

Once it's done you can link your account by typing:

```console
gcloud init
```

# Create Micronaut API

**Micronaut** provides out-of-the-box cloud features.

## Dependencies

Add this to your **pom.xml** file:

```xml
<dependency>
  <groupId>io.micronaut.gcp</groupId>
  <artifactId>micronaut-gcp-common</artifactId>
  <version>3.4.0</version> <!-- check last version on maven central -->
</dependency>
```

## Hello controller

Create a simple **HelloController**:

```java
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;

@Controller("/hello")
class HelloController {
  @Get("/")
  String index() {
    return "Hello Micronaut!";
  }
}
```

# App Engine

The service we are using is **App Engine** which provides highly scalable applications on a fully managed serverless platform.
More details: https://cloud.google.com/appengine

## Create

Go to your **Micronaut** API folder and create a new Google cloud application that will be linked to your API:

```console
gcloud app create
```

## Deploy

First we need to defined a IAM profile that will defined what kind of rights your service has, let's create the default one:

```console
gcloud auth application-default login
```

Then we can deploy with the following:

```console
gcloud app deploy
```

# Conclusion

We can now access our service by using the following command that will open a web browser for us at the service location:

```console
gcloud app browse
```

If we use the controller path **/hello** we get the expected response:

```console
Hello Micronaut!
```
