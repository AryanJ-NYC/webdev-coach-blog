---
author: Aryan Jabbari
title: 'Add Sentry to Vercel Next.js API Routes'
description: Integrate Sentry with your serverless Next.js API routes.
date: 2020-05-10
hero: './img/sentryHandler.png'
---

# Add Sentry to Vercel Next.js API Routes

To add Sentry to Next.js, you can wrap your entire route in a `try` block and have the Sentry reporting done in the `catch` block:

```typescript
// /pages/api/someRoute.ts
import * as Sentry from '@sentry/node';
import { NextApiRequest, NextApiResponse } from 'next';

Sentry.init({ dsn: process.env.SENTRY_DSN });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // ...your main business logic here
  } catch (error) {
    Sentry.captureException(error);
    await Sentry.flush(2000);
    return error;
  }
};
```

Of course, writing that `catch` block over and over is bad programming practice. We can wrap the `try/catch` in a [higher order function](https://eloquentjavascript.net/05_higher_order.html):

```typescript
import * as Sentry from '@sentry/node';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

Sentry.init({ dsn: process.env.SENTRY_DSN });

const sentryHandler = (apiHandler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await apiHandler(req, res);
    } catch (error) {
      console.error(error);
      Sentry.captureException(error);
      await Sentry.flush(2000);
      return error;
    }
  };
};

export default sentryHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  // ...your main business logic here
});
```

You can extract the `sentryHandler` to its own file and wrap it around all the Next.js API routes you need Sentry to handle.
