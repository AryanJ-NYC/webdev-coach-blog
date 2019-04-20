---
templateKey: blog-post
title: 'System Design: Tinder'
description: 'Tinder system design notes based on YouTube video'
date: 2019-04-19T16:46:49.471Z
tags:
  - system design
---
I recently watched [Gaurav Sen](https://www.youtube.com/channel/UCRPMAqdtSgd0Ipeef7iFsKw)'s video on [System Design: Designing Tinder](https://www.youtube.com/watch?v=tndzLznxq40). Below are notes that I took while watching the video. Instead of keeping them for myself, I thought I'd share them. Please contact me on [Twitter](https://twitter.com/AryanJabbari) with any suggestions.

# Specs

1. **Profiles:** Images (5 per profile)
2. **Recommendation system for matches:**  - how many active users?
3. **Store matches:** Perhaps 1 out of 100 swipes are a match? If a user swipes 50 times per day, that's one match every two active days per user.
4. **Messages:** Once matched, users should be able to message each other

# Profiles

## Images

* We can store images as a file or as a blob (binary large object)
  * If stored as BLOB in database:
      * 🚫 mutability - allows for changes to be made to images
          * but why would we want that? We wouldn't be mutating a few bits of the image
      * 🚫 transaction guarantees
          * However, we will not update often so there is no need for [atomicity](https://en.wikipedia.org/wiki/Atomicity_(database_systems))
      * 🚫 indices - improves search
          * but this would search the content of the BLOB (bits) - pretty useless
      * 🚫 Access control - we may be able to set up a file system that gives us equal access control
  * If stored as a file:
      * ✅ less expensive
      * ✅ faster - large objects are stored separately
      * ✅ we can use a [content delivery network](https://en.wikipedia.org/wiki/Content_delivery_network) (CDN) for fast access
      * Our database will be a table with three columns: _imageId_, _profileId_, _fileUrl_

## Profile Service

* Allows for user registration
* Stores user information (which will be used by recommendation service)
* ❓ Authenticates requests
  * send token with each client request
  * however, with _every_ request to _other_ services, there would be duplicated code to validate the token
  * therefore, we'll need to use a [gateway](https://microservices.io/patterns/apigateway.html) (a single entry point for all clients) service instead
* ❓ Stores images
  * there are arguments to be made for images to be its own service:
      * In the future, what if we _only_ need Tinder's images (perhaps machine learning?)?

## Gateway Service

![API Gateway Diagram](/img/apigateway.png "API Gateway basic diagram")

* takes the user request, validates, and routes request to appropriate service
* ✅ reduces number of request roundtrips - gateway can retrieve data from multiple service with a single round-trip
* ✅ simpler API for the client - one gateway vs. many services
* 🚫 increased complexity

## Image Service

* Has a distributed file system and the prior mentioned images DB / table with _imageId_, _profileId_, _fileUrl_

# Recommendation Service

* data will need to be partitioned / clustered / chunked by user geolocation(s). This can be achieved with:
  * NoSQL databases, or
  * Sharding / horizontal partitioning
* After chunked, we can query on age / gender / etc.
* Recommendations service finds and serves _user_s that match the profile of another _user_.
* Should we store those relationships bidirectionally or unidirectionally?
  * Bidirectional
      * ✅ simpler queries
      * 🚫 data can be corrupted easily by mistakenly adding unidirectional relationship
      * ✅ when compared with bidirectional, no additional checks to ensure match is not duplicated
  * Unidirectional
      * 🚫 more complicated queries
      * ✅ data will not be corrupted by forgetting to store other direction (there is no other direction!)
      * 🚫 requires a check that _userId_ < _friendId_ so that no duplicate data is stored (a composite key of _userId_ and _friendId_ fixes this problem right up!)
  * More information about unidirectional vs. bidirectional relationships [here](https://stackoverflow.com/questions/10807900/how-to-store-bidirectional-relationships-in-a-rdbms-like-mysql)

# Matches Service

* server that stores a _userId_ to _userId_ relationship in a database. do we want bidirectional or unidirectional relationships? Read above for more information
* Does swipe data really need to be persisted? Is it so bad if users are re-recommended to the same person?
  * If allowed to be recommended same person > 1 time, storing swipe data in client is OK
  * If not, we'll need to persist swipes

# Message Service

* We have two clients that want to chat with each other
* clientA request to the gateway service is sent to message clientB
* the request will be sent from the gateway to the matcher service to confirm that a match exists before allowing a message to be sent

## Connection Protocol

* We can use client-server protocol or XMPP protocol
  * client-server protocol
      * clientA sends a request to store a message in the server's database
      * 🤮 clientB will need to poll the server (continuously ask server if there are new messages) which is extremely inefficient
  * XMPP protocol
      * 😃 all machines (client and server) are peers (no client-server) and can send messages to each other
      * web socket connection is taken - connection maintained

## Session Service

* stores connection information (_userId_ and _connectionId_)
