# Clients
This covers how GraphQL affects:
- Sending queries and mutations without constructing HTTP requests
- View-layer integration
- Caching
- Validation and optimization of queries based on schema

## Directly Sending Queries and Mutations
All the frontend needs to worry about is writing queries
- GraphQL abstracts away sending the request and handling the response


## View Layer Integrations & UI Updates
With React, GraphQL uses higher-order components to fetch the needed data and make it available through `props`
- GraphQL's declarative syntax lends well to **Functional Reactive Programming** techniques, which are techniques for handling asynchronous data flow using functional programming
- This makes it so a view can just declare what data it depends on


## Caching Query Results: Concepts and Strategies
With GraphQL, _**DO NOT ATTEMPT TO CACHE QUERY RESULTS IN A LOCAL STORE**_
- The right way to handle caching is by **Normalizing** data beforehand
- This means that you take these steps after receiving the result of a query:
  1. Flatten a result if it's nested
  2. Give the individual fields a unique ID and put it in a store

Caching is usually handled by whichever frontend client you use (Apollo or Relay)


### Path Assumption
Apollo makes an assumption: _Each path in the application data graph points to some stable information_
- For cases where this is not true, **Object Identifiers** are used to prevent Apollo from operating under this assumption

Apollo calculates the difference between a new query and data that's already in the cache
- If the new query contains a path that describes cached data, Apollo removes that path from the query
- In order to prevent this, you use the `forceFetch` option


### Using Object Identifiers when Path Assumption isn't enough
There are cases where two different queries lead to the same object of information
- With the path assumption, this would mean that the one object is cached under multiple paths
- The solution for this is **Object Identifiers**, where you specify a unique ID for any object you query
- Apollo thus makes the assumption: _All objects with the same identifier represent the same piece of information_
- One way to create a unique ID is by combining the SQL ID and the `__typename` property returned by GraphQL


### Build-time Schema Validation & Optimizations
During build time, all GraphQL code in the project can be parsed and compared to the schema
- This allows you to catch errors and typos


### Colocating Views and Data Dependencies
You can place UI code and data requirements side-by-side
