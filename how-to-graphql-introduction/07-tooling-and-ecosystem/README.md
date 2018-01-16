# Tooling and Ecosystem

## Introspection
**Introspection** is when the client asks the server about its GraphQL schema
- The client can query the `__schema` meta-field
- This field is always available on the root of a query:

  ```
  query {
    __schema {
      types {
        name
      }
    }
  }
  ```

- Consider the following schema:

  ```
  type Query {
    author(id: ID!): Author
  }

  type Author {
    posts: [Post!]!
  }

  type Post {
    title: String!
  }
  ```

- Sending the query above will result in:

  ```
  {
    "data": {
      "__schema": {
        "types": [
          {
            "name": "Query"
          },
          {
            "name": "Author"
          },
          {
            "name": "Post"
          },
          {
            "name": "ID"
          },
          {
            "name": "String"
          },
          {
            "name": "__Schema"
          },
          {
            "name": "__Type"
          },
          {
            "name": "__TypeKind"
          },
          {
            "name": "__Field"
          },
          {
            "name": "__InputValue"
          },
          {
            "name": "__EnumValue"
          },
          {
            "name": "__Directive"
          },
          {
            "name": "__DirectiveLocation"
          }
        ]
      }
    }
  }
  ```

You can also introspect on the type level using the meta-field `__type`
- Introspective query:

  ```
  {
    __type(name: "Author") {
      name
      description
    }
  }
  ```

- Result:

  ```json
  {
    "data": {
      "__type": {
        "name": "Author",
        "description": "The author of a post."
      }
    }
  }
  ```


## GraphiQL
Browser IDE for writing, validating, and testing GraphQL queries
