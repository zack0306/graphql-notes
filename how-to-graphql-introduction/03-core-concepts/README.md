# Core Concepts
We will learn about these fundamental language constructs:
1. Types
2. Queries
3. Mutations


# The Schema Definition Language
Defining a `Person` type:
```
type Person {
  name: String!
  age: Int!
}
```

- The `!` denotes a required field

You can also express relationships between types:
```
type Post {
  title: String!
  author: Person!
}
```

Now, let's make a change to the `Person` type:
```
type Person {
  name: String!
  age: Int!
  posts: [Post!]!
}
```
- Here, we are creating a one-to-many relationship
- One `Person` can have many `Post`s
- One `Post` can only have one `Person` author


## Fetching Data with Queries
Example query
- Request:
  ```
  {
    allPersons {
      name
      age
    }
  }
  ```
  - `allPersons` is called the **Root Field** of the query
  - Everything inside the root field is the **Payload**

- Response:
  ```json
  {
    "data": {
      "allPersons": [
        {
          "name": "Johnny",
          "age": 23
        },
        {
          "name": "Sarah",
          "age": 20
        },
        {
          "name": "Alice",
          "age": 20
        }
      ]
    }
  }
  ```

### Queries with Arguments
Each field can have arguments if specified by the schema
- Example of a query that gets the last 2 results of a dataset:
  ```
  {
    allPersons(last: 2) {
      name
    }
  }
  ```


### Writing Data with Mutations
**Mutations** are how changes are made to data stored in the backend

There are usually 3 types of mutations:
1. Create
2. Update
3. Delete

Mutation requests use a `mutation` keyword:
- Request:
  ```
  mutation {
    createPerson(name: "Bob", age: 36) {
      name
      age
    }
  }
  ```
  - In this example, `createPerson` is the root field
  - The `name` and `age` fields within `createPerson`'s curly braces are what data the client wants to receive after creating the new `Person`

- Response:
  ```json
  {
    "data": {
      "createPerson": {
        "name": "Bob",
        "age": 36
      }
    }
  }
  ```

A common pattern is creating unique IDs whenever a new object of whatever type is created:
```
type Person {
  id: ID!
  name: String!
  age: Int!
}
```


### Realtime Updates with Subscriptions
GraphQL has **Subscriptions** so the client can receive instant notifications from the server when a certain event occurs
- When a client subscribes to an event, a steady connection is opened and maintained
- When that event occurs, the server pushes the corresponding data to the client
- These subscriptions are a stream of data sent to the client
- Syntax for a subscription request:
  ```
  subscription {
    newPerson {
      name
      age
    }
  }
  ```
  - When this request is sent, a connection is opened
  - Whenever the `newPerson` event occurs, the backend sends the client the `name` and `age` data


## Defining a Schema
The **Schema** defines the capabilities of the API
- Contract between server and client
- Generally, a schema is a collection of GraphQL types

There are special **Root Types**
1. Query
2. Mutation
3. Subscription

The special root types are the entry point for requests sent by the client
- To enable the `allPersons` query from earlier, we define a `Query` type in our schema:
  ```
  type Query {
    allPersons: [Person!]!
  }
  ```
  - In this example, `allPersons` is a **Root Field**
- To enable sending the `allPersons` query with arguments:
  ```
  type Query {
    allPersons(last: Int): [Person!]!
  }
  ```
- To enable creating a person:
  ```
  type Mutation {
    createPerson(name: String!, age: Int!): Person!
  }
  ```
- To enable subscriptions:
  ```
  type Subscription {
    newPerson: Person!
  }
  ```
