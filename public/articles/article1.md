# Introduction

The following article explains how to manually start and stop H2 console with our API. The implementation will be for both Spring-boot and Micronaut frameworks.

## Update pom.xml

Verify H2 is available at compilation and not runtime only.

```xml
<dependency>
  <groupId>com.h2database</groupId>
  <artifactId>h2</artifactId>
  <!-- <scope>runtime</scope> comment or remove this line -->
</dependency>
```

## Custom configuration

In order to avoid others existing H2 console configuration let's create our own like the following in **application.yml**:

```yml
h2:
  console:
    enabled: true
    port: 8081
```

**Note:** We can't start our API and H2 on the same port like spring-boot/tomcat will usually do, so we need a custom port instead like **8081**.

## Implementation

Logic of the implementation:

- API startup -> start H2 console
- API shutdown -> stop H2 console

Both implementations are simple and very similar. The main differences are the way to catch the **startup** and **shutdown** events and to conditionaly create the bean based on our **h2.console.enabled=true** flag.

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

# Conclusion

We can now start our API, H2 console will be available at: **http://localhost:8081**
