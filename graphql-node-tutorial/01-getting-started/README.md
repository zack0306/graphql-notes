# Getting Started


## Defining the Application's GraphQL API
[Schema Definition Language](https://blog.graph.cool/graphql-sdl-schema-definition-language-6755bcb9ce51)
[Overview on GraphQL Schemas](https://blog.graph.cool/graphql-server-basics-the-schema-ac5e2950214e)


## API Requirements
We will be building the backend for a clone of Hackernews
- Get a list of link elements
- Let users sign up with their name, email and password
- Let users log in with their email and password
- Let authenticated users post new links
- Let authenticated users upvote links
- Send realtime updates to subscribed clients when a new link is created
- Send realtime updates to subscribed clients when an existing link is upvoted


## Defining the Application Schema
Translate requirements into GraphQL queries, mutations, and subscriptions

**Schema-driven Development**:
1. Adjust the data model your Prisma database service is using
2. Deploy the Prisma database to apply changes
3. Extend application schema with a new root field
4. Implement the resolves for the root field
  - Delegate execution to the right Prisma resolver


## Bootstraep Your GraphQL Server
The tool `graphql-cli` bootstraps a GraphQL server (similar to `create-react-app`)
- Set up your GraphQL server:

```bash
graphql create
```

- This will create a bunch of files and folders in the project directory

`prisma.yml` is the root configuration file for the Prisma database service
- Name of service
- Deployment information
- Pointer to the data model


## Background: Application Schema vs Prisma Schema (CRUD)
The three `.graphql` files with type definitions in the project:
- `src/schema.graphql` is the application schema
  - Defines the API that is exposed to the client applications
- `src/generated/prisma.graphql` defines the Prisma API with CRUD functionality
  - Auto-generated based on the data model
  - When changes are made to the data model, this file gets updated as well
- `src/database/datamodel.graphql` contains type definitions for the entities in your application domain
  - Prisma generates queries and mutations for all types in the data model
    - **\* Database records are also known as nodes**
  - Only used for generating the Prisma API, which is the schema that the application actually uses
    - With just the Prisma schema, clients will have read/write access to all of your application's data


## Understanding the Initial Setup
The boilerplate includes two dependencies:
- `graphql-yoga` is a wrapper on top of Express.js, `apollo-server`, `graphql-tools`, etc.
- `prisma-binding` binds your application's resolvers to the auto-generated resolvers of the Prisma database service

The GraphQL server setup:

```javascript
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/public-dewspike-598/hackernews-clone/dev', // the endpoint of the Prisma DB service
      secret: 'mysecret123', // specified in database/prisma.yml
      debug: true, // log all GraphQL queries & mutations
    }),
  }),
});
```

- Here, `context` is an object that gets passed through the resolver chain
  - All resolvers can read or write to this object
  - Has an instance of Prisma that delegates the execution of incoming requests to a resolver from the Prisma API
    - `secret` allows you to access the Prisma database service
