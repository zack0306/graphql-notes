# Queries
We will implement the resolver for the `feed` field
- List of links


## Define a `Link` type for the data model
First, replace the auto-generated `Post` type

Each link that gets stored in the database should have:
- Unique ID
- Description
- URL

In `./database/datamodel.graphql`, replace `Post` with:

```
type Link {
  id: String! @unique
}
```


## Deploy the Database to Apply Changes
To deploy the Prisma database service:

```
yarn prisma deploy
```


## Adjust the Application Schema
CRUD operations are now supported
- Now, we need to update the application schema so that can used `feed` queries:

```
# import Link from "./generated/prisma.graphql"

type Query {
  feed(filter: String, skip: Int, first: Int): [Link!]!
}
```

- In this schema, we import `Link` from the Prisma schema
  - Importing is enabled by `graphql-import`


## Import the `feed` Resolver
Resolvers will be in `Query.js`, `Mutation.js`, and `Subscription.js`
- `index.js` will use these to instantiate the `GraphQLServer`
- We'll keep all resolvers in `./src/resolvers`
- The query:

```javascript
const feed = (parent, args, context, info) => {
  const { filter, first, skip } = args;
  const where = filter
    ? { OR: [{ urlContains: filter }, { descriptionContains: filter }] }
    : {};

  return context.db.query.links({ first, skip, where }, info);
};

export default feed;
```
