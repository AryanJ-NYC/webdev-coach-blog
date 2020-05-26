---
author: Aryan Jabbari
title: 'RedwoodJS with Sanity.io CMS as Backend'
description: 'Use RedwoodJS with Sanity.io CMS as your Backend.'
date: 2020-05-20
hero: './redwood-js-with-sanity.png'
---

# RedwoodJS with Sanity.io

This past weekend, I built [a tiny application with RedwoodJS](https://github.com/AryanJ-NYC/redwood-with-sanity-example) using Sanity.io as a CMS. [I videostreamed myself building it](https://www.youtube.com/watch?v=91Mpn1JN1NM) for those of you who are interested.

## What I Built

Sanity.io comes with a movie dataset out of the box. I kept it simple and built a MovieList page and a MovieDetail page. I was mostly focused on how I can get RedwoodJS to work with Sanity.io as a data source.

## How to use Sanity.io with RedwoodJS

### Create GraphQL Movie Object Type

After standing up my Sanity server (instructions on how to do that in [the project README](https://github.com/AryanJ-NYC/redwood-with-sanity-example/blob/master/README.md)), I used [Sanity Vision](https://www.sanity.io/docs/the-vision-plugin) to get a feel for the movie data object. Since `yarn rw g scaffold movie` needs a Prisma model in `schema.prisma` (which I didn't use for this small project), I kind of cheated. [I made a temporary movie model in `schema.prisma`](https://www.youtube.com/watch?v=91Mpn1JN1NM) to leverage `yarn rw g scaffold movie`. Then, I went into [`movies.sdl.js`](https://github.com/AryanJ-NYC/redwood-with-sanity-example/blob/master/api/src/graphql/movies.sdl.js) and edited it a bit. I added the types I would render in the UI to `movies.sdl.js` so there are some data in the Sanity.io movie data object that went unaccounted for.

### Create Movie Service

I had to edit the movie service to query from Sanity.io rather then the Prisma database. First, I created a [Sanity client hooked up to my Sanity project](https://github.com/AryanJ-NYC/redwood-with-sanity-example/blob/master/api/src/lib/sanity.js):

```javascript
import sanityClient from '@sanity/client';

export const sanity = sanityClient({
  projectId: process.env.SENTRY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
});
```

Then, I used this client in [my movies service](https://github.com/AryanJ-NYC/redwood-with-sanity-example/blob/master/api/src/services/movies/movies.js) to fetch all movies and a movie by its slug:

```javascript
import { sanity } from '../../lib/sanity';

const moviesQuery = /* groq */ `*[_type == "movie"]`;
export const movies = () => {
  return sanity.fetch(moviesQuery);
};

const movieBySlugQuery = /* groq */ `*[_type == "movie" && slug.current == $slug][0]`;
export const movie = ({ slug }) => {
  return sanity.fetch(movieBySlugQuery, { slug });
};
```

### Update the Movie Cells

Next, I updated the [`MoviesCell`](https://github.com/AryanJ-NYC/redwood-with-sanity-example/blob/master/web/src/components/MoviesCell/MoviesCell.js) and the [`MovieCell`](https://github.com/AryanJ-NYC/redwood-with-sanity-example/blob/master/web/src/components/MovieCell/MovieCell.js) with updated GraphQL queries and each movie in the `MoviesCell` linking to the `MovieDetailsPage`:

```jsx
// MoviesCell.js
import { Link, routes } from '@redwoodjs/router';
import { urlFor } from 'src/lib/sanity';

export const QUERY = gql`
  query {
    movies {
      poster {
        asset {
          _ref
        }
      }
      slug {
        current
      }
      title
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }) => <div>Error: {error.message}</div>;

export const Success = ({ movies }) => {
  return movies.map((movie) => {
    return (
      <Link key={movie.slug.current} to={routes.movieDetail({ slug: movie.slug.current })}>
        <img src={urlFor(movie.poster.asset).width(200).url()} />
      </Link>
    );
  });
};
```

```jsx
// MovieCell.js
import { urlFor } from 'src/lib/sanity';

export const QUERY = gql`
  query($slug: String!) {
    movie(slug: $slug) {
      poster {
        asset {
          _ref
        }
      }
      slug {
        current
      }
      title
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }) => <div>Error: {error.message}</div>;

export const Success = ({ movie }) => {
  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={urlFor(movie.poster.asset).width(500).url()} />
    </div>
  );
};
```

From there, it was smooth sailing. I rendered `MoviesCell` and `MovieCell` in my `MovieListPage` and `MovieDetailPage`, respectively.

## Notes on My Experience

1. Unfortunately, my project does not build. I documented this [here](https://community.redwoodjs.com/t/error-on-yarn-rw-web-build/591) and I'd love some help in getting it deployed!

2. At first, I mentally prepared myself to not use the API side of RedwoodJS at all. I expected to be able to use Sanity.io directly from the cells. However, much to my disappointment, cells are tightly coupled with the API side (at least that's my understanding). The exported `QUERY` is run against the API side with the data being injected into the cell as `props`. I'm a bit worried that makes it impossible to leverage everything RedwoodJS has to offer without the API side (though, at the same time, maybe that's the point of using an opinionated framework? 🤔).

   - What I secretly wish: What if, instead of a GraphQL query that is exported and run against the API side, there was an exported function that returns an object that is then injected to props? That way, instead of:

   ```jsx
   // MoviesCell.js
   import { Link, routes } from '@redwoodjs/router';
   import { urlFor } from 'src/lib/sanity';

   export const QUERY = gql`
     query {
       movies {
         poster {
           asset {
             _ref
           }
         }
         slug {
           current
         }
         title
       }
     }
   `;
   // Loading, Error and Empty removed for brevity

   export const Success = ({ movies }) => {
     return movies.map((movie) => {
       return (
         <Link key={movie.slug.current} to={routes.movieDetail({ slug: movie.slug.current })}>
           <img src={urlFor(movie.poster.asset).width(200).url()} />
         </Link>
       );
     });
   };
   ```

   we have:

   ```jsx
   import { Link, routes } from '@redwoodjs/router';
   import { request } from 'graphql-request';
   import { urlFor } from 'src/lib/sanity';

   const QUERY = gql`
     query {
       movies {
         poster {
           asset {
             _ref
           }
         }
         slug {
           current
         }
         title
       }
     }
   `;

   export const getter = () => {
     const data = request('/api', QUERY);
     return data;
   };

   // Loading, Error and Empty removed for brevity

   export const Success = ({ movies }) => {
     return movies.map((movie) => {
       return (
         <Link key={movie.slug.current} to={routes.movieDetail({ slug: movie.slug.current })}>
           <img src={urlFor(movie.poster.asset).width(200).url()} />
         </Link>
       );
     });
   };
   ```

   We're able to run the same query we did before AND use data stemming from a different source instead of being tightly coupled to the API side.

3. I ran into a problem where I needed my Sanity client on both the web and API sides. I wasn't easily able to share code so I had to write the same code in both the `/api` and `/web` directories. 🤮 I'm excited to see [what goes into the cookbook to solve this](https://github.com/redwoodjs/redwood/issues/531).
   - I remember using [`nx`](https://github.com/nrwl/nx) a bit for monorepos and they had a `nx generate @nrwl/node:library <name>` command that was quite nifty.
4. I funnily found out the Redwood Router supports page redirects. There was nothing about it in the docs but [I tried it and it just worked](https://www.youtube.com/watch?v=91Mpn1JN1NM&feature=youtu.be&t=5491):

```jsx
<Route path="/" redirect="/movies" />
```
