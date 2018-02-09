# Subscriptions
We will use subscriptions to send realtime updates for:
1. Creation of new link elements
2. Upvoting of existing link elements


## What are GraphQL Subscriptions?
Implemented using Websockets


## Subscriptions with Prisma
Prisma comes with subscription functionality out of the box
- We see this in `src/generated/prisma.graphql`:

```
type Subscription {
  vote(where: VoteSubscriptionWhereInput): VoteSubscriptionPayload
  link(where: LinkSubscriptionWhereInput): LinkSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}
```

- These subscriptions can fire when a node is created, updated, or deleted
  - To constrain when events fire, use the `where` argument in the subscription

Subscriptions have the same syntax as queries and mutations
- Example of subscribing to `Link` updates:

```
subscription {
  link(where: { mutation_in: [UPDATED] }) {
    node {
      id
      url
      description
    }
  }
}
```


## Implementing GraphQL Subscriptions
Subscriptions are implemented by following the same process as adding queries and mutations
- Add them to the application schema
- Implement the corresponding resolvers


Update for the application schema:

```
type Subscription {
  newLink: LinkSubscriptionPayload
  newVote: VoteSubscriptionPayload
}
```

- The `LinkSubscriptionPayload` and `VoteSubscriptionPayload` types must be imported from `generated/prisma.graphql`


To implement the resolvers, create `src/resolvers/Subscription.js`:

```javascript
const newLink = { subscribe: (parent, args, ctx, info) => ctx.db.subscription.link({}, info) };
const newVote = { subscribe: (parent, args, ctx, info) => ctx.db.subscription.vote({}, info) };

module.exports = { newLink, newVote };
```

- Note that for the current subscriptions, **where filters do not work**
- The actual implementation of these subscription resolvers is delegated to the Prisma instance from the `prisma-binding` package
- Now, we need to add these resolvers to `index.js`:

```javascript
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')

const resolvers = {
  Query,
  Mutation,
  Subscription,
}
```


These subscriptions can be tested after running `yarn start`
