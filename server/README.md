# Personal Blog

For now, there's only the back-end, as that's what i'm learning currently. The front-end will be added in the future

To see how it's currently working:

Clone this repo, and download it's dependencies

```sh
$ git clone https://github.com/FilipyTav/Personal_blog.git
cd Personal_blog/server
npm install
```

Then, create a .env file at the root directory, containing the following variables:

```ts
// The port the app listens to
PORT;

// Your mongodb connection url
MONGODB_CONNECTION;

// The secret string jwt uses
JWT_SECRET;
```

## Routes

#### Posts

```http
Base route: "/posts"

GET "/"

GET "/:post_id"

GET "/:post_id/comments"

POST "/:post_id/comments"

GET "/:post_id/comments/:comment_id"
```

#### Users

```http
Base route: "/users"

GET "/"

POST "/login"

GET "/:user_id"

```

#### Admin

```http
Base route: "/admin"

GET "/posts"

GET "/posts/:post_id"

POST "/posts"

PUT "/posts/:post_id"

DELETE "/posts/:post_id"
```
