---
# The following is WIP for integration test only
---

# Introduction

By default H2 console is enabled using spring-boot with Tomcat server but sometimes we may also want to enable it in another environment such as Undertown or Netty or even. The following article will explain how to achive the implementation for both Spring-boot and Micronaut frameworks.

The implementation is really easy and looks almost the same for both frameworks :)

## Update pom.xml

Most commun implementation of H2 is to use it at runtime / test. In our situation we need it for compilation in order to import the needed classes.

```xml
<dependency>
  <groupId>com.h2database</groupId>
  <artifactId>h2</artifactId>
  <!-- <scope>runtime</scope> comment or remove this line -->
</dependency>
```

## Configuration

We are going to create our own H2 console configuration. This one has to be different from existing H2 configurations to void conflicts.
For example like the following (but you can choose whatever you want) at the root of the configuration file: **application.yml**

```yml
h2:
  console:
    enabled: true
    port: 8081
```

In a normal Spring-boot + Tomcat, H2 console would have start on the same port than the server (ex: 8080) but in our situation we need to define separated port number like **8081**

## Implementation

Both implementations are simple and very similar. The logic remains the same, we are going to create a bean which will catch both **startup** and **shutdown** event of our API then inside both event we respectively start / stop H2 console. The bean **H2ConsoleService** will start only if the property **h2.console.enabled=true** this way it's easy to define different values for differents execution profiles.

### Spring-boot

```java
import lombok.extern.slf4j.Slf4j;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@ConditionalOnProperty(prefix = "h2.console", name = "enabled", havingValue = "true")
public class H2ConsoleService {

  private Server webServer;

  @Value("${h2.console.port:8081}")
  private Integer port;

  @EventListener(ContextRefreshedEvent.class)
  public void start() throws java.sql.SQLException {
    log.info("Starting h2 console on port " + port);
    this.webServer = org.h2.tools.Server.createWebServer("-webPort", port.toString()).start();
  }

  @EventListener(ContextClosedEvent.class)
  public void stop() {
    log.info("Stopping h2 console on port " + port);
    this.webServer.stop();
  }
}
```

### Micronaut

```java
import io.micronaut.context.annotation.Requires;
import io.micronaut.context.annotation.Value;
import io.micronaut.context.event.ShutdownEvent;
import io.micronaut.context.event.StartupEvent;
import io.micronaut.runtime.event.annotation.EventListener;
import lombok.extern.slf4j.Slf4j;
import org.h2.tools.Server;

import javax.inject.Singleton;
import java.sql.SQLException;

@Slf4j
@Singleton
@Requires(property = "h2.console.enabled", value = "true")
public class H2ConsoleService {

    private Server server;

    @Value("${h2.console.port}")
    private Integer port = 8081;

    @EventListener
    public void onStartupEvent(StartupEvent e) throws SQLException {
        log.info("Starting h2 console on port " + port);
        this.server = org.h2.tools.Server.createWebServer("-webPort", port.toString()).start();
    }

    @EventListener
    public void onStartupEvent(ShutdownEvent e){
        log.info("Stopping h2 console on port " + port);
        this.server.stop();
    }

}
```
