---
author: Aryan Jabbari
title: 'I Migrated Away from Apollo Client to Vercel SWR and Prisma graphql-request...and You Can Too!'
description: 'Migrate Away from Apollo Client to useSWR.'
date: 2020-05-13
hero: './hero.png'
---

# I Migrated Away from Apollo Client to Vercel SWR and Prisma graphql-request...and You Can Too!

GraphQL requests are simply POST requests made to your GraphQL endpoint. Why, oh why, does it need all this overhead of setting up an Apollo Client?

I was tired of setting up Apollo Client and it proved to be [a huge headache when paired with Vercel Next.js's Now](https://github.com/zeit/next.js/issues?q=is%3Aissue+apollo+client+). Something needed to give.

Enter [Prisma's graphql-request](https://github.com/prisma-labs/graphql-request) (for making the actual POST request) and [Vercel SWR](https://github.com/zeit/swr) (for state caching). By remove Apollo Client, I manage to shave off 40 kB from my JavaScript build. I mean, look at this [Next.js with Apollo hell](https://github.com/zeit/next.js/blob/canary/examples/with-apollo/lib/apollo.js) I avoided!

OK, OK, you came here for examples of how to migrate. Here they are!

## Basic Query without a Variable

With Apollo Client

```typescript
// with Apollo Client:
import { gql, useQuery } from '@apollo/client';

const PAID_JOBS_QUERY = gql`
  query paidJobPosts {
    jobPosts {
      id
    }
  }
`;
const yourReactComponent = () => {
  const { data, loading, error } = useQuery(PAID_JOBS_QUERY);
};
```

With Vercel SWR and Prisma graphql-request

```typescript
// with SWR and graphql-request
import { request } from 'graphql-request';
import useSWR from 'swr';

// the comment below gives us VSCode syntax highlighting!
const PAID_JOBS_QUERY = /* GraphQL */ `
  query paidJobPosts {
    jobPosts {
      id
    }
  }
`;
const yourReactComponent = () => {
  const { data, error } = useSWR(PAID_JOBS_QUERY, (query) => request('/api', query));
  const loading = !data;
};
```

## Basic Query with a Variable

With Apollo Client

```typescript
// with Apollo Client:
import { gql, useQuery } from '@apollo/client';
const JOB_POST_BY_ID_QUERY = gql`
  query jobPostByIdQuery($id: String) {
    jobPost(where: { id: $id }) {
      id
    }
  }
`;
const yourReactComponent = ({ id }) => {
  const { data, loading, error } = useQuery(JOB_POST_BY_ID_QUERY, { variables: { id } });
};
```

With Vercel SWR and Prisma graphql-request

```typescript
// with SWR and graphql-request
import { request } from 'graphql-request';
import useSWR from 'swr';

// the comment below gives us VSCode syntax highlighting!
const JOB_POST_BY_ID_QUERY = /* GraphQL */ `
  query paidJobPosts {
    jobPosts {
      id
    }
  }
`;
const yourReactComponent = ({ id }) => {
  const { data, error } = useSWR([JOB_POST_BY_ID_QUERY, id], (query, id) =>
    request('/api', query, { id })
  );
  const loading = !data;
};
```

## Basic Mutation with Variables

With Apollo Client

```typescript
// with Apollo Client:
import { gql, useMutation } from '@apollo/client';

const CREATE_JOB_POST_MUTATION = gql`
  mutation createJobPostMutation($jobName: String!) {
    createOneJobPost(jobName: $jobName) {
      id
    }
  }
`;
const yourReactComponent = () => {
  const [createJobPost] = useMutation(CREATE_JOB_POST_MUTATION);

  const submitJobPost = async (jobName) => {
    const { data } = await createJobPost({ variables: { jobName } });
    // do something with job post
  };
};

// with SWR and graphql-request
import { request } from 'graphql-request';
import useSWR from 'swr';

const CREATE_JOB_POST_MUTATION = /* GraphQL */ `
  mutation createJobPostMutation($jobName: String!) {
    createOneJobPost(jobName: $jobName) {
      id
    }
  }
`;
const createJobPost = (variables) => {
  return request('/api', CREATE_JOB_POST_MUTATION, variables);
};

const yourReactComponent = ({ id }) => {
  const submitJobPost = async (jobName) => {
    const data = await createJobPost({ jobName });
    // do something with data
  };
};
```

## Mutation with Cache Refreshing

With Apollo Client

```typescript
// with Apollo Client:
import { gql, useMutation, useQuery } from '@apollo/client';

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
    }
  }
`;
const someReactComponentThatFetchesMe = () => {
  const { data } = useQuery(ME_QUERY);
};

const SIGNIN_MUTATION = gql`
  mutation signInMutation($email: String!, password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`;
const yourReactComponent = () => {
  const [signin] = useMutation(SIGNIN_MUTATION);

  const submit = (email, password) => {
    signin({ variables: { email, password }, refetchQueries: [{ query: ME_QUERY }] });
  };
};
```

With Vercel SWR and Prisma graphql-request

```typescript
// with SWR and graphql-request
import { request } from 'graphql-request';
import useSWR from 'swr';

const ME_QUERY = /* GraphQL */ `
  query MeQuery {
    me {
      id
    }
  }
`;
const someReactComponentThatFetchesMe = () => {
  const { data } = useSWR(ME_QUERY); // the key to this value in cache is the value fo ME_QUERY
};

const SIGNIN_MUTATION = /* GraphQL */ `
  mutation signInMutation($email: String!, password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`;
const signIn = (variables) => {
  return request('/api', SIGNIN_MUTATION, variables);
};

const yourReactComponent = () => {
  const { mutate } = useSWR(ME_QUERY); // the mutate function will do the refetching for us

  const submit = async (email, password) => {
    await signin({ email, password });
    mutate(); // call mutate here to refetch Me after signin
  };
};
```
