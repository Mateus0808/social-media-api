<div id="top" align="center">

# Social Network Backend

## Modeling

- Hashtag model

```javascript
{
  id: ObjectId, // unique id automatically generated
  name: String, // hashtag name  (without the # sign)
  publications: [{ type: ObjectId, ref: 'Publication' }], // list of ids of publications that use the hashtag
  createdAt: Date, // hashtag create date
  updatedAt: Date // hashtag update date
}
```

- User model
```javascript
{
  id: ObjectId, // automatically generated unique id
  name: String, // user's name
  latName: String, // user's last name
  email: String, // user's email
  birthDate: Date // user's birth date
  maritalStatus: string // user's marital status
  phone: string // user's phone number
  gender: 'MALE' | 'FEMALE' // user's gender
  password: String, // encrypted user's password
  profilePhoto: String, // user's profile photo URL
  followers: [{ type: ObjectId, ref: 'User' }], // list of ids of users who follow this user
  following: [{ type: ObjectId, ref: 'User' }], // list of ids of users whom this user follows
  posts: [{ type: ObjectId, ref: 'Post' }], // list of ids of user's posts
  status: 'ACTIVE' | 'CLOSED' | 'CANCELED' | 'DISABLED'
  isPrivate: Boolean, // indicates whether user's account is private or not
  createdAt: Date, // user's creation date
  updatedAt: Date // user's last update date
}
```

- Publication model
```javascript
{
  id: ObjectId, // automatically generated unique id
  userId: ObjectId, // id of the user who created the post
  image: String, // url of the post image
  caption: String, // post caption or description
  likes: [{ type: ObjectId, ref: 'User' }], // list of ids of users who liked the post
  comments: [{ type: ObjectId, ref: 'Comment' }], // list of ids of comments on the post
  shareCount: Number, // number of times the post was shared
  shareUrl: String, // Shared post URL
  shareTitle: String, // shared post title
  shareDescription: String, // shared post description
  shareImage: String // shared post image
  createdAt: Date, // post creation date
  updatedAt: Date // post last update date
}
```

- Comment model
```javascript
{
  id: ObjectId, // automatically generated unique id
  userId: ObjectId, // id of the user who created the comment
  postId: ObjectId, // id of the post to which the comment belongs
  text: String, // comment text
  createdAt: Date, // comment creation date
  updatedAt: Date // comment last update date
}
```

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
        1.6.2 [x] ✅ Update username
        1.6.3 [x] ✅ Update name
        1.6.4 [ ] Update contact information
  - [ ] 1.7 Search user by username
  - [ ] 1.8 Search user by name
  - [ ] 1.9 Create timeline

- Post
  - [x] ✅ 1.1 Create a post
  - [x] ✅ 1.2 List user posts
  - [x] ✅ 1.3 Deletar post by id
  - [x] ✅ 1.4 List post by ID
  - [ ] 1.5 Like a post
  - [ ] 1.6 Unlike a post
  - [ ] 1.7 Share a post

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
```
