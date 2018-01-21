# Mutations
In this section, we will write a mutation for creating new `Link`s instead of using Prisma's auto-generated mutation


## Mutation for Posting New Links
Add a `Mutation` type to `src/schema.graphql`:

```
type Mutation {
  post(url: String!, description: String!): Link!
}
```


Now, we need to add the resolver for it in `src/resolvers/Mutation.js`:

```javascript
const post = (parent, args, context, info) => {
  const { url, description } = args;
  return context.db.mutation.createLink({ data: { url, description } }, info);
}

module.exports = { post };
```


Finally, we add the `Mutation` resolvers to `index.js`:

```javascript
const Mutation = require('./resolvers/Mutation');

const resolvers = {
  Query,
  Mutation,
};
```


To test the new mutation, run `yarn run dev` and send this mutation in the `app` section of the playground:

```
mutation {
  post(url: "https://www.howtographql.com", descrtipion: "Fullstack tutorial website for GraphQL") {
    id
  }
}
```
