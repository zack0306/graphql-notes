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

- After making these changes, deploy Primsa again
- We've created the one-to-many relationship, but now we need to ensure that the data is properly entered into the database when a `post` mutation is received
  - We need to adjust the `post` resolver


## Adjusting the `post` Resolver
