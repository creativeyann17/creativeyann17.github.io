# Introduction

In this example we will see how to implement the **BCrypt** encoder using the **spring-security-crypto** dependency same as available in a Spring-boot Security API. This dependency contains set of cryptographic functions with almost nothing related to Spring-boot so don't worry about importing it into your Micronaut project. Be able to use a password encoder is mandatory in case you want to store critical information in database server-side.

# Update pom.xml

```xml
  <dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-crypto</artifactId>
    <version>5.4.5</version> <!-- check Maven repository for last version-->
  </dependency>
```

# PasswordEncoder interface

This part is optional but in case you would like to have different encoder implementations you need a generic interface to inject in your beans. Following is an equivalent of the one used in Spring-Boot:

```java
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public interface PasswordEncoder {

  String encode(@NotBlank @NotNull String rawPassword);

  boolean matches(@NotBlank @NotNull String rawPassword, @NotBlank @NotNull String encodedPassword);
}
```

# BCryptPasswordEncoderService

Now we are going to implement **PasswordEncoder** with for BCrypt:

```java
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.inject.Singleton;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Singleton
public class BCryptPasswordEncoderService implements PasswordEncoder {

  private final org.springframework.security.crypto.password.PasswordEncoder delegate = new BCryptPasswordEncoder();

  public String encode(@NotBlank @NotNull String rawPassword) {
    return delegate.encode(rawPassword);
  }

  @Override
  public boolean matches(@NotBlank @NotNull String rawPassword, @NotBlank @NotNull String encodedPassword) {
    return delegate.matches(rawPassword, encodedPassword);
  }
}
```

**Note:** You can't _decode_ a BCrypt password, it's a expected to work that way. It's also a good server side practice to not know the raw value of a critical information. The way you can validate if two passwords are the same is to use _matches_ between encoded BCrypt passwords.

# Conclusion

Our **PasswordEncoder** is ready and we can inject it where it's necessary using a simple injection:

```java
  @Inject
  private PasswordEncoder passwordEncoder;
  ...
  passwordEncoder.encode(rawPassword);
  ...
  passwordEncoder.matches(rawPasswordFromRequest, bcryptPasswordFromDatabase);
```
