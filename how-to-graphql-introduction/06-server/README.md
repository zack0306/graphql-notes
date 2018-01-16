# Server

## GraphQL Execution
GraphQL describes an execution algorithm for transforming queries into results
- Traverse the query field by field
- Execute resolver functions for each field
- Does breadth-first traversal of the query

**\* Think of resolver functions as "little routers"**

GraphQL server implementations usually have **Default Resolvers** so you don't have to specify a new resolver for a new field


## Bathed Resolving
The same resolver function may get called several times for a query
- We want to avoid fetching the same data multiple times
- To handle this, we can wrap the fetch function in a utility that resolves everything given to it, then makes sure to minimize the number of fetches
- If the backend/API we fetch from supports batch requests, that would solve the problem as well
