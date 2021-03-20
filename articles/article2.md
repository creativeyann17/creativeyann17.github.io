# Introduction

Working with documents databases like **Mongo-db** make us forget how SQL databases work with all the jointures between tables. Sometimes you really feel like:
_"I wish there could be another solution than @ManyToMany ..."_ and in fact there is one, please consider the **@Convert** approach.

## @Convert annotation

The **javax.persistence.Converter** annotation provides a simple way to convert (and un-convert) a JAVA class into JDBC type. You can easily convert a **List** into **String** like the example below.

**Note:** @Convert should be used only for specific cases where you know that using a join table will be too much.

## User with roles example

Let's consider a **User** with different **Roles** that we need to persist into database _(This example is using Lombok)_:

```java
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

**Note:** We use a **Set** to store the roles list but a **List** will work too.

Now let see the **RoleSetConverter** implementation:

```java
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@Converter
public class RoleSetConverter implements AttributeConverter<Set<User.Role>, String> {

    @Override
    public String convertToDatabaseColumn(Set<User.Role> strings) {
        return strings.stream().map(User.Role::name).reduce((l,r) -> l+","+r).get();
    }

    @Override
    public Set<User.Role> convertToEntityAttribute(String s) {
        return Arrays.asList(s.split(",")).stream()
                .map(User.Role::valueOf)
                .collect(Collectors.toSet());
    }
}
```

We use a comma separator to convert a **Set** to **String** and back, very simple.

**Note:** This solution is generic and use **java Stream** but **spring-boot** provides some really nice utils functions from **org.springframework.util.StringUtils** that can improve our code like this:

```java
  @Override
  public String convertToDatabaseColumn(Set<User.Role> strings) {
    return StringUtils.collectionToCommaDelimitedString(strings);
  }

  @Override
  public Set<User.Role> convertToEntityAttribute(String s) {
    return StringUtils.commaDelimitedListToSet(s).stream()
        .map(User.Role::valueOf)
        .collect(Collectors.toSet());
  }
```

# Conclusion

This is the result of two persisted users using this JPA approach, as you can see the **ADMIN** user has both _USER_ and _ADMIN_ roles.

![H2 console test result image](articles/images/article2_1.png 'Logo Title Text 1')
