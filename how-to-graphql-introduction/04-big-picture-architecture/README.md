# Big Picture (Architecture)
GraphQL has only been released as a specification
- To use GraphQL, you need to build a GraphQL server
- There are tools that provide a GraphQL server out of the box

This will cover 3 use cases:
1. GraphQL server with a connected database
2. GraphQL server used as a layer over third party/legacy systems (united through a single GraphQL API)
3. Connected database + third party/legacy systems accessed through a GraphQL API

## GraphQL Server with a Connected Database
Most common for greenfield projects
- Has a single server that implements the GraphQL specification
- When a query arrives at the server, the payload is read and the required information is retrieved from the database
  - This is known as **Resolving** the query
- Constructs the response object as described in the official specification, then returns it to the client
- GraphQL is **Transport-layer Agnostic**, can be used with TCP, WebSockets, etc.
- GraphQL can be used with SQL or NoSQL


## GraphQL Layer that Integrates Existing Systems
This architecture is for companies that use legacy infrastructure that have grown so much that it's hard to maintain
- GraphQL can be used to unify these systems
- The GraphQL server is built to retrieve the appropriate data from the appropriate systems


## Hybrid Approach with Connected Database and Legacy Systems
When the GraphQL receives queries, it can either retrieve data from the existing systems or the database that the GraphQL server is connected to


## Resolver Functions
For each field in a GraphQL query, there is a **Resolver Function**
- The resolver functions are responsible for fetching data for its field
- When all resolver functions return their values, the server packages the data in the format specified by the query


## GraphQL Client Libraries
1. Relay
2. Apollo
