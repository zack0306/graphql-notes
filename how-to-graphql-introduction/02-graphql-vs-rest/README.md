# GraphQL is the better REST
To illustrate the differences between REST and GraphQL, use a blogging platform example:
- The application must display posts of a specific user
- The screen must show the last 3 followers of that user as well


## Data Fetching with REST vs GraphQL
With REST, at least 3 API calls are needed to get:
1. Initial user data
2. User's post data
3. User's follow data

With GraphQL, only one query is needed
- Request:

```
query {
  User(id: "ert8fusd90j") {
    name
    posts {
      title
    }
    followers(last: 3) {
      name
    }
  }
}
```

- Response:

```json
{
  "data": {
    "User": {
      "name": "Mary",
      "posts": [
        { "title": "Learn GraphQL Today" }
      ],
      "followers": [
        { "name": "John" },
        { "name": "Alice" },
        { "name": "Sarah" }
      ]
    }
  }
}
```


## Rapid Product Iterations on the Frontend
For a REST API, a change in frontend data requirements means backend effort needed to update the data sent back from the API
- With GraphQL, the frontend just needs to change the schema to fit the data it's looking for now


## Analytics
Since the client only requests what it needs from the GraphQL server, the backend has deeper insight into how much of the available data the client is actually using
- You can more easily pick what to deprecate

GraphQL uses **Resolver Functions** to collect data requested by the client
- You can measure the performance of these functions to find bottlenecks in your system


## Benefits of a Schema and Type System
GraphQL uses a strong type system for defining API capabilities
- Types exposed in an API are specified in a **Schema**, which uses the **GraphQL Schema Definition Language**
