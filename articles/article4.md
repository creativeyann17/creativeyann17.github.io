# Introduction

This article describes step by step how to implement a Spring-boot application with **JSON Web Token (JWT)** authentication.

As we would like to make this example kind of a template for future projects we will also add some features to it:

- Use **Undertow** instead of default **Tomcat**
- Add **Actuators** to monitor our API
- Manage global exception handling
- Specific **local** configuration
- Start H2 console in **local**
- **HelloController** to test our API
- Unitary tests using JUnit

Full source code of the article is available [here](https://github.com/creativeyann17/spring-boot-jwt-ready).

# Undertow

By default Spring-boot uses **Tomcat** as embedded servlet container. **Undertow** has shown really good performances and requires no change in term of code, this is why we want to use it here.

In **pom.xml** we need to change the following:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
  <exclusions>
    <!-- exclude tomcat dependency from spring-boot-starter-web -->
    <exclusion>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-tomcat</artifactId>
    </exclusion>
  </exclusions>
</dependency>
<!-- add spring-boot-starter-undertow -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-undertow</artifactId>
</dependency>
```

**Note:** H2 console will not work by default with **Undertow** we explain how to enable it in another [article](https://creativeyann17.github.io/#/article/h2-console).

When you start the API the console should display:

```console
Undertow started on port(s) 8080 (http)
```

# JSON Web Token (JWT)

**JWT** have become a common way to store user credentials and is exchanged between client and server for every request. In most case you will rely on a external provider such as **Okta** to create + validate such token but in our case we want to do it on our own.

## Configuration

**JWT** tokens need two mandatory information:

- A **secret** known only by your API (must be have a size >= 256 bits, you can generate one randomly or [here](https://www.grc.com/passwords.htm))
- An expiration time after what the token is no more valid and need to be refreshed

Let's create a configuration based on that:

```yml
jwt:
  secret: ${JWT_SECRET}
  expiration: 300 # in seconds <=> 5 minutes
```

**Note:**

```java
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Data
@Validated
@Configuration
@ConfigurationProperties(prefix = "jwt", ignoreUnknownFields = false)
public class JwtProperties {

  @NotBlank
  private String secret;

  @Min(60)
  @Max(3600)
  private Integer expiration;

}

```

**Note:** We use spring-boot **validation** to validate that the properties are filled as expected otherwise the API will fail at startup and display the reason.

## Utils

We are going to implement a **JwtUtils** class in charge of creating + validating our tokens. As spring-boot doesn't provide anything to do that we need to import some dependencies in our **pom.xml**:

```xml
<!-- properties, check maven central for last version-->
<jsonwebtoken.version>0.10.5</jsonwebtoken.version>
<!-- dependencies -->
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt-api</artifactId>
  <version>${jsonwebtoken.version}</version>
</dependency>
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt-impl</artifactId>
  <version>${jsonwebtoken.version}</version>
  <scope>runtime</scope>
</dependency>
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt-jackson</artifactId>
  <version>${jsonwebtoken.version}</version>
  <scope>runtime</scope>
</dependency>
```

The utils class will contains the following methods:

```java

import com.creativeyann17.springbootjwtready.properties.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public class JwtUtils {

  @Autowired
  private JwtProperties jwtProperties;

  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(token).getBody();
  }

  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    return createToken(claims, userDetails.getUsername());
  }

  private String createToken(Map<String, Object> claims, String subject) {
    return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * jwtProperties.getExpiration()))
        .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecret()).compact();
  }

  public boolean validateToken(String token, UserDetails userDetails) {
    final String username = extractUsername(token);
    return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
  }
}

```

# Authentication

Now that we have the foundation of our JWT token creation + validation let see how to connect it to the spring-boot security part.

## User & roles

First we will create a **User** repository where our users are stored and we can query them out by username:

```java
import com.creativeyann17.springbootjwtready.domain.converters.RoleSetConverter;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(
    name = "users",
    indexes = {@Index(name = "username_index", columnList = "username", unique = true)})
@Data
public class User {

  public enum Role {
    USER,
    ADMIN
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "username", nullable = false)
  private String username;

  @Column(name = "password", nullable = false)
  private String password;

  @Column(name = "roles", nullable = false)
  @Convert(converter = RoleSetConverter.class)
  private Set<Role> roles;
}
```

The **User** entity is simple. We define an index with unicity on column _username_ to improve our query performance on this column and to guaranty that _username_ will be unique among all users.

We use a **JPA converter** to persist the _Roles_, more details in another [article](https://creativeyann17.github.io/#/article/jpa-converter).

```java
import com.creativeyann17.springbootjwtready.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
  Optional<User> findByUsername(String username);
}
```

Our repository contains all the **CrudRepository** methods (findById, findAll, save ...) + we define a custom one to find by _username_.

## User details

We are now going to define a custom **UserDetailsService** which is going to explain to spring-boot security how do we construct a **UserDetails** based on a **username**:

```java
import com.creativeyann17.springbootjwtready.repositories.UserRepository;
import com.creativeyann17.springbootjwtready.utils.MyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MyUserDetailsService implements UserDetailsService {

  private static final String ROLE_PREFIX = "ROLE_";

  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepository
        .findByUsername(username)
        .map(user -> new User(user.getUsername(), user.getPassword(), mapRolesToGrantedAuthorities(user.getRoles())))
        .orElseThrow(() -> new UsernameNotFoundException(username));
  }

  private List<GrantedAuthority> mapRolesToGrantedAuthorities(Collection<com.creativeyann17.springbootjwtready.domain.User.Role> roles) {
    return MyUtils.emptyIfNull(roles).stream()
        .map(role -> new SimpleGrantedAuthority(normalizeRoleName(role)))
        .collect(Collectors.toList());
  }

  // Spring boot security implicitly add ROLE_ prefix
  private String normalizeRoleName(com.creativeyann17.springbootjwtready.domain.User.Role role) {
    return role.name().startsWith(ROLE_PREFIX) ? role.name() : ROLE_PREFIX + role.name();
  }
}
```

The implementation logic is:

- _loadUserByUsername_ try to find the user in the UserRepository
- if the user exist we return _UserDetails_ with the user information
- if the user doesn't exist we throw an exception

**Note:** spring-boot security uses internally a prefix for every role: **ROLE\_** and as we don't want to store this prefix into database we can add it here.

## Auth. controller

We are now going to implement the **AuthController** in charge of creating a new token when a user requests one:

```java
import com.creativeyann17.springbootjwtready.models.AuthRequest;
import com.creativeyann17.springbootjwtready.models.AuthResponse;
import com.creativeyann17.springbootjwtready.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class AuthController {

  @Autowired
  private UserDetailsService userDetailsService;

  @Autowired
  private JwtUtils jwtUtils;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @PostMapping("/auth/signin")
  public ResponseEntity<AuthResponse> signin(@Validated @RequestBody AuthRequest authRequest) {
    UserDetails userDetails = null;

    try {
      userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
    } catch (AuthenticationException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid username");
    }
    if (!passwordEncoder.matches(authRequest.getPassword(), userDetails.getPassword())) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid password");
    }
    final String token = jwtUtils.generateToken(userDetails);
    return ResponseEntity.ok(AuthResponse.builder().accessToken(token).build());
  }
}

```

The implementation logic is:

- try to find the **UserDetails** based on the request _username_ field
- We catch the **AuthenticationException** if necessary and throw a custom **BAD_REQUEST** from it
- Id the user exists we check if the encoder password in database matches the raw (non-encoded) of the request
- We the password doesn't match we throw a custom **BAD_REQUEST**
- if everything is fine we return a new **JWT** to the user

**Note:** passwordEncoder.matches(rawPassword, encodedPassword) first param is the raw (not encoded) password, no need to encode it before.

# Security

In order to access our **AuthController** we need to allow the **/auth/signin** route in spring-boot security because for now if we try to access it it will return **403 FORBIDDEN**.

```java

import com.creativeyann17.springbootjwtready.services.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {

  @Autowired
  private MyUserDetailsService myUserDetailsService;

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(myUserDetailsService);
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable().cors().and()
        .authorizeRequests()
        .antMatchers("/auth/signin").permitAll()
        .antMatchers("/actuator/**").hasRole("ADMIN")
        .antMatchers("/hello/**").permitAll()
        .anyRequest().authenticated().and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Override
  @Bean
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }
}

```

- We enable **BCryptPasswordEncoder** as our password encoder here
- **AuthenticationManager** is a spring-boot 2 limitation and need to be override to work properly
- We disable csrf and enable cors (this part really depend of what you expect to do with your API)
- We also set the session to **STATELESS** which mean we don't store any information of the current session

We can now login our user:

```console
curl --location --request POST 'http://localhost:8080/auth/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "user",
    "password": "password"
}'
```

And retrieve a nice **JWT**

```console
{
    "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImlhdCI6MTYxNjMwMDQ4OSwiZXhwIjoxNjE2MzAwNzg5fQ.x7R8v2ac1wYstkndblwmPUBRQ-ihZ_4k1UKyceMHLsM"
}
```

**JWT** need to be kept secret and share with nobody as they authenticate a user with the authorizations the user is expected to have, like **ADMIN**.

Important to note that **JWT** aren't encoded and the derails they contains can be seen using this tools [jwt.io](https://jwt.io/).

## JWT Request filter

Now that we can authenticate our user we need to validate all the requests and extract the token from them, it can be done using a **OncePerRequestFilter** that spring-boot security will call at each request:

```java
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtRequestFilter extends OncePerRequestFilter {

  private static final String BEARER = "Bearer ";

  @Autowired
  private MyUserDetailsService userDetailsService;

  @Autowired
  private JwtUtils jwtUtils;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    final String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (StringUtils.hasText(authorizationHeader) && authorizationHeader.startsWith(BEARER)) {
      try {
        final String token = authorizationHeader.replaceFirst(BEARER, "");
        final String username = jwtUtils.extractUsername(token);  // failed if expired
        if (StringUtils.hasText(username)) {
          final UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
          if (jwtUtils.validateToken(token, userDetails)) { // should never failed
            final UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
          }
        }
      } catch (ExpiredJwtException e) {
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Token expired");
      } catch (MalformedJwtException e) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Malformed JWT token");
      }
    }
    filterChain.doFilter(request, response);
  }
}
```

The filter will try to extract the **Bearer** token located in the **Authorization** header. The filter should not block it not token is present, we may have some public endpoints that don't require a token, but if it exists the filter will check if the user exists and if the token is valid (not expired).

Creating the filter itself isn't sufficient, we need to add it to the list of existing filters inside **SecurityConfigurer**

```java
  @Autowired
  private JwtRequestFilter jwtRequestFilter;
  ...
   @Override
  protected void configure(HttpSecurity http) throws Exception {
    ...
    http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
  }
```

Now our filter is enabled.

# Global exception handling

We now need to add a little of code to fix an issue we have with our **JwtRequestFilter**. Indeed if we throw an exception it will not be handled and format like an exception coming out of a **Controller**. To do that we will encapsulate all our filters with another one in charge of catching exceptions:

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class ChainExceptionHandlerFilter extends OncePerRequestFilter {

  @Autowired
  @Qualifier("handlerExceptionResolver")
  private HandlerExceptionResolver resolver;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    try {
      filterChain.doFilter(request, response);
    } catch (Exception e) {
      resolver.resolveException(request, response, null, e);
    }
  }
}

```

We will also defined a global exception handler in charge of transforming every **ResponseStatusException** and more globally **Exception** into **ErrorResponse**:

```java
import com.creativeyann17.springbootjwtready.models.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.Optional;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandlerService {
  @ExceptionHandler(ResponseStatusException.class)
  public ResponseEntity<ErrorResponse> responseStatusException(ResponseStatusException e) {
    log.warn(e.getMessage());
    final HttpStatus status = Optional.ofNullable(e.getStatus()).orElse(HttpStatus.INTERNAL_SERVER_ERROR);
    final ErrorResponse errorDto = ErrorResponse.builder()
        .timestamp(new Date())
        .message(e.getReason())
        .error(status.getReasonPhrase())
        .status(e.getRawStatusCode())
        .build();
    return new ResponseEntity<>(errorDto, e.getStatus());
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> exception(Exception e) {
    log.error(e.getMessage(), e);
    final HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
    final ErrorResponse errorDto = ErrorResponse.builder()
        .timestamp(new Date())
        .message(e.getMessage())
        .error(status.getReasonPhrase())
        .status(status.value())
        .build();
    return new ResponseEntity<>(errorDto, status);
  }
}

```

# Additional properties

## Jackson

We can format our JSON responses to always be **SNAKE_CASE** and ignore null fields:

```yml
spring:
  jackson:
    property-naming-strategy: SNAKE_CASE
    default-property-inclusion: non_null
```

# Conclusion

We now have a fully ready spring-boot API where the user can:

- authenticate and get a **JWT**
- validate the **JWT** for each request
- filter by **ROLE** our endpoints
- have a global exception handler
- Undertow + H2 console
