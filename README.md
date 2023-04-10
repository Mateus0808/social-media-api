<div id="top" align="center">

# Social Network Backend

## Features

- Authentication
  - [x] ✅ 1.1 Authentication middleware
  - [x] ✅ 1.2 User login with email and password

- User
  - [x] ✅ 1.1 Register user with name, username, email, phone, password, etc
  - [x] ✅ 1.2 List users
  - [x] ✅ 1.3 List user by ID
  - [x] ✅ 1.4 Follow an user
  - [x] ✅ 1.5 Unfollow user
  - [ ] 1.6 Update user information
        1.6.1 [x] ✅ Update email
        1.6.1 [x] ✅ Update username
        1.6.1 [x] ✅ Update name
        1.6.1 [ ] Update address
        1.6.2 [ ] Update contact information
  - [ ] 1.7 Search user by username
  - [ ] 1.8 Search user by name
  - [ ] 1.9 Create timeline

- Post
  - [x] ✅ 1.1 Create a post
  - [x] ✅ 1.2 List user posts
  - [x] ✅ 1.3 Deletar post by id
  - [ ] 1.4 List post by ID
  - [ ] 1.5 Like a post
  - [ ] 1.6 Unlike a post
  - [ ] 1.6 Share a post

- Comment
  - [x] ✅ 1.1 Add comment on a post
  - [x] ✅ 1.2 Delete comment from a post
  - [x] ✅ 1.3 List comments for a post
  - [x] ✅ 1.4 Update comment on post
  - [ ] 1.5 Get comment by id
  - [ ] 1.6 Like a comment
  - [ ] 1.7 Unlike a comment
  - [ ] 1.8 Comment on a comment on a post

<p align="right">(<a href="#top">Go to the top</a>)</p>

---

## Routes

- User
  - `/users/:id`
  - `user/authentication`
  - `/users/register`
  - `/users`
  - `/user/follow/:currentUserId/following/:userId`
    - Exemplificando: `/user/follow/${IdUserAdmin}/:${normalUser}

- Post
  - `/post/register/:userId`
  - `/post/:postId`
  - `/posts`

- Comment
  - `/comments`
  - `/comment/register/:userId/:postId`

---
