---
templateKey: blog-post
title: 'System Design: Tinder'
date: 2019-04-19T16:46:49.471Z
tags:
  - system design
---
# Specs

1. **Profiles:** Images (5 per profile)
2. **Recommendation system for matches:**  - how many active users?
3. **Store matches:** Perhaps 1 out of 100 swipes are a match? If a user swipes 50 times per day, that's one match every two active days per user.
4. **Messages:** Once matched, users should be able to message each other

# Profiles

## Images

- We can store images as a file or as a blob (binary large object)
    - If stored as BLOB in database:
        - 🚫 mutability - allows for changes to be made to images
            - but why would we want that? We wouldn't be mutating a few bits of the image
        - 🚫 transaction guarantees
            - However, we will not update often so there is no need for [atomicity](https://en.wikipedia.org/wiki/Atomicity_(database_systems))
        - 🚫 indices - improves search
            - but this would search the content of the BLOB (bits) - pretty useless
        - 🚫 Access control - we may be able to set up a file system that gives us equal access control
    - If stored as a file:
        - ✅ less expensive
        - ✅ faster - large objects are stored separately
        - ✅ we can use a [content delivery network](https://en.wikipedia.org/wiki/Content_delivery_network) (CDN) for fast access
        - Our database will be a table with three columns: *imageId*, *profileId*, *fileUrl*

## Profile Service

- Allows for user registration
- Stores user information (which will be used by recommendation service)
- ❓ Authenticates requests
    - send token with each client request
    - however, with *every* request to *other* services, there would be duplicated code to validate the token
    - therefore, we'll need to use a [gateway](https://microservices.io/patterns/apigateway.html) (a single entry point for all clients) service instead
- ❓ Stores images
    - there are arguments to be made for images to be its own service:
        - In the future, what if we *only* need Tinder's images (perhaps machine learning?)

## Gateway Service

![](Untitled-e144f8f3-984f-4ffa-9b0c-221c674836c6.png)

- takes the user request, validates, and routes request to appropriate service
- ✅ reduces number of request roundtrips - gateway can retrieve data from multiple service with a single round-trip
- ✅ simpler API for the client - one gateway vs. many services
- 🚫 increased complexity

## Image Service

- Has a distributed file system and the prior mentioned images DB / table with *imageId*, *profileId*, *fileUrl*

# Recommendation Service

- data will need to be partitioned / clustered / chunked by user geolocation(s). This can be achieved with:
    - NoSQL databases, or
    - Sharding / horizontal partitioning
- After chunked, we can query on age / gender / etc.
- Recommendations service finds and serves *user*s that match the profile of another *user*.
- Should we store those relationships bidirectionally or unidirectionally?
    - Bidirectional
        - ✅ simpler queries
        - 🚫 data can be corrupted easily by mistakenly adding unidirectional relationship
        - ✅ when compared with bidirectional, no additional checks to ensure match is not duplicated
    - Unidirectional
        - 🚫 more complicated queries
        - ✅ data will not be corrupted by forgetting to store other direction (there is no other direction!)
        - 🚫 requires a check that *userId* < *friendId* so that no duplicate data is stored (a composite key of *userId* and *friendId* fixes this problem right up!)
    - More information [here](https://stackoverflow.com/questions/10807900/how-to-store-bidirectional-relationships-in-a-rdbms-like-mysql)

# Matches Service

- server that stores a *userId* to *userId* relationship in a database. do we want bidirectional or unidirectional relationships? Read above for more information
- Does swipe data really need to be persisted? Is it so bad if users are re-recommended to the same person?
    - If allowed to be recommended same person > 1 time, storing swipe data in client is OK
    - If not, we'll need to persist swipes

# Message Service

- We have two clients that want to chat with each other
- clientA request to the gateway service is sent to message clientB
- the request will be sent from the gateway to the matcher service to confirm that a match exists before allowing a message to be sent

## Connection Protocol

- We can use client-server protocol or XMPP protocol
    - client-server protocol
        - clientA sends a request to store a message in the server's database
        - 🤮 clientB will need to poll the server (continuously ask server if there are new messages) which is extremely inefficient
    - XMPP protocol
        - 😃 all machines (client and server) are peers (no client-server) and can send messages to each other
        - web socket connection is taken - connection maintained

## Session Service

- stores connection information (*userId* and *connectionId*)
