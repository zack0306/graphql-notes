# Security
One potential issue is that clients can make very complex queries
- If a query is complex or large enough, it can bring down the GraphQL server

## Timeout
Timeouts can be used to defend against large queries
- However, damage may occur even when the timeout takes place
- Timeouts can be hard to implement
- Cutting off connections can result in strange behavior


## Maximum Query Depth
GraphQL schemas are often cyclic graphs
- Clients can send queries that are infinitely nested
- A GraphQL can reject a request by analyzing its Abstract Syntax Tree (AST)
  - The maximum level of nesting can be defined
- Since the AST is constructed before the query executes, no damage will occur
- The problem with this technique is that the client can still request a large number of root nodes
  - The query won't be deep, but it is still asking for a large amount of data


## Query Complexity
You can define how complex it is to fulfill a certain field in a query
- You can enforce a **Maximum Complexity**
- Specify complexity using numbers:

  ```
  query {
    author(id: "abc") { // complexity: 1
      posts {           // complexity: 1
        title           // complexity: 1
      }
    }
  }
  ```

- This query's complexity would then add up to 3
- This technique is hard to implement perfectly
  - Involves measuring the performance of resolving each field
  - The complexity value ends up just being an estimation made by developers
  - You need a way to keep track of and update complexities
  - Mutation complexity is difficult to measure -- side effects and background processes may be involved


## Throttling
The techniques mentioned above are suited for handling large queries
- They do not protect against numerous medium-sized queries
- For GraphQL, throttling the number of requests doesn't help

### Throttling Based on Server Time
The cost of a query can be estimated by how much time the server needs to complete it
- With this information, you can set a maximum amount of time that a client can use
- Decide the rate at which server time is given to the client
- With this method, publicly accessible GraphQL APIs should publicly express the throttling constraints


### Throttling Based on Query Complexity
Define a maximum cost per time a client can use based on the "Query Complexity" section above
