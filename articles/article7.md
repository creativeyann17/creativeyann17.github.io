# Introduction

The following article explains how to integrate and use GraphQL in both **Micronaut** and **React.js**. The example below is based on the existing API used by this website to get and increase the count of views of an article.

# API

Micronaut provides a GraphQL dependency and configurable properties out of the box.

## Dependencies

Add this dependency to your **pom.xml** file:

```xml
<dependency>
  <groupId>io.micronaut.graphql</groupId>
  <artifactId>micronaut-graphql</artifactId>
  <scope>compile</scope>
</dependency>
```

## Properties

You can **enabled** and set the **path** of your graphql:

```yml
graphql:
  enabled: true
  path: /graphql
```

## Schema definition

GraphQl as a query language needs to know the **schema** of your queries. There are 3 types of schema:

- query (read-only <=> equivalent to GET)
- mutation (modification <=> POST/PUT/PATCH/DELETE)
- subscription (event based <=> websocket)

In this example we will only work with **query** and **mutation** that will be defined into **resources/schema.graphqls**:

```js
schema {
    query: QueryRoot
    mutation: MutationRoot
}

type QueryRoot {
    getViewArticle(article: String!): View!
}

type MutationRoot {
    postViewArticle (article: String!): View!
}

type View {
 article: String!
 count: Int!
}
```

**Note:** more about **GraphQl schema definition** [here](https://graphql.org/learn/queries/).

## Map queries & mutations

Now that we have defined our **schema** we need to explain to **Micronaut** how to map the queries and mutations:

```java
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import io.micronaut.context.annotation.Bean;
import io.micronaut.context.annotation.Factory;
import io.micronaut.core.io.ResourceResolver;

import javax.inject.Singleton;
import java.io.BufferedReader;
import java.io.InputStreamReader;

@Factory
public class GraphQLFactory {

  @Bean
  @Singleton
  public GraphQL graphQL(ResourceResolver resourceResolver, GetViewDataFetcher getViewDataFetcher, PostViewDataFetcher postViewDataFetcher) {

    SchemaParser schemaParser = new SchemaParser();
    SchemaGenerator schemaGenerator = new SchemaGenerator();

    // Parse the schema.
    TypeDefinitionRegistry typeRegistry = new TypeDefinitionRegistry();
    typeRegistry.merge(schemaParser.parse(new BufferedReader(new InputStreamReader(
        resourceResolver.getResourceAsStream("classpath:schema.graphqls").get()))));

    // Create the runtime wiring.
    RuntimeWiring runtimeWiring = RuntimeWiring.newRuntimeWiring()
        .type("QueryRoot", typeWiring -> typeWiring
            .dataFetcher("getViewArticle", getViewDataFetcher))
        .type("MutationRoot", typeWiring -> typeWiring
            .dataFetcher("postViewArticle", postViewDataFetcher))
        .build();

    // Create the executable schema.
    GraphQLSchema graphQLSchema = schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring);

    // Return the GraphQL bean.
    return GraphQL.newGraphQL(graphQLSchema).build();
  }
}
```

As you can see we explain to our API that the following query and mutation defined in **resources/schema.graphqls** will be mapped as following:

- getViewArticle => getViewDataFetcher
- postViewArticle => postViewDataFetcher

Following example of implementation for both mappers:

```java
@Singleton
public class GetViewDataFetcher implements DataFetcher<ViewResponse> {

  @Inject
  private ViewController viewController;

  @Override
  public ViewResponse get(DataFetchingEnvironment dataFetchingEnvironment) throws Exception {
    return viewController.getViewArticle((String) dataFetchingEnvironment.getArgument("article")).body();
  }
}
```

```java
@Singleton
public class PostViewDataFetcher implements DataFetcher<ViewResponse> {

  @Inject
  private ViewController viewController;

  @Override
  public ViewResponse get(DataFetchingEnvironment dataFetchingEnvironment) throws Exception {
    return viewController.postViewArticle((String) dataFetchingEnvironment.getArgument("article")).body();
  }
}
```

**Note**: As we already have a REST controller that know how to get/post count of views for an article, we use it instead of re-implementing the business logic.

## GraphiQl (optional)

A really useful tool you can use to test in local your GraphQL implementation is named **GraphiQl**. Micronaut provides an embedded one that you can be enabled like the following:

```yml
graphql:
  graphql-ws:
    enabled: true
  graphiql:
    enabled: true
```

**Note:** GraphQL over websocket needs to be enabled in order to have GraphiQl working at the following URL : **/graphiql**

Here is an example of test done with **GraphiQl**:

![GraphiQl view](articles/images/article7_1.png 'GraphiQl view')

# Front-end

Now that our back-end is ready to receive **GraphQl** queries, we can setup the front-end to call it.

## Package

**React** needs some packages:

- @apollo/client => This single package contains virtually everything you need to set up Apollo Client. It includes the in-memory cache, local state management, error handling, and a React-based view layer.
- graphql => This package provides logic for parsing GraphQL queries.

**Source**: https://www.apollographql.com/docs/react/get-started

```console
npm install --save @apollo/client graphql
```

## Initialization

The _minimal_ initialization of **apollo client** required the **uri** where the graphql call will be done and the type of cache. Here we stay simple by using **InMemoryCache**:

```js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});
```

## Query

We use **gql** to defined our queries like below:

### Definition

```js
import { gql } from '@apollo/client';

export const getViewArticleQuery = gql`
  query getViewArticleQuery($article: String!) {
    getViewArticle(article: $article) {
      article
      count
    }
  }
`;

export const postViewArticleQuery = gql`
  mutation postViewArticleQuery($article: String!) {
    postViewArticle(article: $article) {
      article
      count
    }
  }
`;
```

**Note:** Graphql is really more powerful than that. Here we only use it like we could have used a REST client.

### fetch

We can now fetch our queries using the **useQuery React hook**:

```js
import { useQuery } from '@apollo/client';

const { loading, error, data } = useQuery(getViewArticleQuery, {
  variables: { article: 'my_article_id' },
});
```

The component will be refreshed each times _loading, error, data_ will be updated. In the end we can access our result inside _data_ like this:

```js
data.getViewArticle.article = 'foo';
data.getViewArticle.count = '0';
```

# Conclusion

We know have a fully working **Micronaut** API that support **GraphQL** calls from a **React.js** app.
