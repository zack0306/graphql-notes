# Applying Authentication
In this section, we will use the authentication token to associate an incoming request with a user of the application


## Creating a Relation Between `User` and `Link`
As it is right now, the application lets anyone post a link
- We need to only let authenticated users do so
- We will create this association by altering the data model
  - One `User` can post many `Link`s

In `database/datamodel.graphql`:

```
type Link {
  id: ID! @unique
  description: String!
  url: String!
  postedBy: User
}

type User {
  id: ID! @unique
  name: String!
  email: String! @unique
  password: String!
  links: [Link!]!
}
```

- After making these changes, deploy Prisma again
- We've created the one-to-many relationship, but now we need to ensure that the data is properly entered into the database when a `post` mutation is received
  - We need to adjust the `post` resolver


## Adjusting the `post` Resolver
We need to send the `User`'s `id` or `email` during the `post`
- Example mutation:

```
mutation {
  createLink(
    data: {
      url: "https://www.graphql.org",
      description: "Official GraphQL Website",
      postedBy: {
        connect: {
          email: "johndoe@graph.cool"
        }
      }
    }
  ) {
    id
  }
}
```

The changes we make to `src/resolvers/Mutation.js`:

```javascript
const post = (parent, { url, description }, context, info) => {
  const userId = getUserId(context);

  return context.db.mutation.createLink(
    {
      data: {
        url,
        description,
        postedBy: {
          connect: {
            id: userId,
          },
        },
      },
    },
    info,
  );
};
```

- Here, we're making use of a `getUserId` function that we haven't defined yet


We will add `getUserId` to `src/helpers.js`:

```javascript
const getUserId = (context) => {
  const Authorization = context.request.get('Authorization');
  if (!Authorization) throw new Error('Not authenticated');

  const token = Authorization.replace('Bearer ', '');
  const { userId } = jwt.verify(token, APP_SECRET);
  return userId;
};
```

- `context` has a `request` property that represents the incoming HTTP request that brings the query or mutation
- It also provides access to the request headers
  - Authentication tokens are usually found in the `Authorization` header field
- The token is prepended with "Bearer "
  - After replacing that string, we verify the token using the `jwtwebtoken` library


## Authenticating a `User`
We need to use the authentication token to make requests on behalf of a specific `User`
- To test this flow:
  1. Send a `login` mutation
  2. Copy the token in the response and paste it into an `Authorization` HTTP header
  3. Test the `post` mutation and `feed` query


## Adding a `vote` Mutation
We will need to add a new `Vote` type to `database/datamodel.graphql`
- User will also need to be updated to keep track of all their votes

```
type Vote {
  id: ID! @unique
  link: Link!
  user: User!
}

type User {
  id: ID! @unique
  name: String!
  email: String! @unique
  password: String!
  links: [Link!]!
  votes: [Vote!]!
}
```

- After these changes, Prisma needs to be deployed again

The next step is to create the root level field for the `vote` mutation in `src/schema.graphql`:

```
# import Link, Vote from "./generated/prisma.graphql"

type Mutation {
  post(url: String!, description: String!): Link
  signup(name: String!, email: String!, password: String!): AuthPayload!
  login(email: String!, password: String!): AuthPayload!
  vote(linkId: String!): Vote
}
```

Next step is to implement the `vote` resolver in `src/resolvers/Mutation.js`:

```javascript
const vote = async (parent, args, context, info) {
  const userId = getUserId(context);
  const { linkId } = args;
  const voteExists = await context.db.exists.Vote({
    user: { id: userId },
    link: { id: linkId },
  });

  if (voteExists) throw new Error('Already voted for this link');

  return context.db.mutation.createVote(
    {
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: linkId } },
      },
    },
    info,
  );
};
```
