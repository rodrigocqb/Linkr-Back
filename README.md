# Linkr API

This is the backend part of Linkr: A simple link-sharing social network.

Here you can find the respective repository for the front end application: [**Linkr**](https://github.com/Tallispt/Linkr-Front).

## Technologies Used

- [NodeJS](https://nodejs.org/pt-br/docs)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Joi](https://joi.dev/api/?v=17.9.1)

## Usage

1. Fork or clone repository

2. Create a postgreSQL database

3. Import database information via ./dump.sql file

4. Configure the **.env** file as the **.env.exemple**:
  > *PORT*: port number (default is 5000)  
  > *DATABASE_URL*: [postgres connection string](https://www.prisma.io/dataguide/postgresql/short-guides/connection-uris)  
  > *JWT_SECRET*: JWT secret key 

5. Install libraries  
  ```
  npm i
  ```

6. To start the application, on development mode:  
  ```
  npm run dev
  ```

7. Or if you want to run the application on production mode:  
  ```
  npm start
  ```

The api will be available at http://localhost:5000.

### API Endpoints
Category | HTTP Verbs | Private | Endpoints | Action |
| :--- | :---: | :--: | --- | --- |
| *Auth* | POST | | /signup | To sign up a new user account |
| *Auth* | POST | | /signin | To login an existing user account |
| *User* | GET | ✓ | /user/:id | To retrieve posts of a single user |
| *User* | GET | ✓ | /followers/user | To retrieve all users followers |
| *User* | GET | ✓ | /search/:name | To retrieve a search list |
| *User* | POST | ✓ | /follow | To follow a single user |
| *User* | POST | ✓ | /unfollow | To unfollow a single user |
| *User* | GET | ✓ | /verifyFollowers | To retrieve followerers verification |
| *Post* | GET | ✓ | /timeline | To retrieve all posts of followed ones |
| *Post* | POST | ✓ | /posts | To create a single post |
| *Post*| POST | ✓ | /posts/like | To like a single post |
| *Post* | POST | ✓ | /posts/dislike | To dislike a single post |
| *Post* | PUT | ✓ | /posts/:id | To edit a single post |
| *Post* | DELETE | ✓ | /posts/:id | To delete a single post |
| *Share* | POST | ✓ | /share/:postId | To create a single post share |
| *Share* | DELETE | ✓ | /share/:postId | To delete a single post share |
| *Hashtag* | GET | ✓ | /trends | To retrieve a hashtag rank list |
| *Hashtag* | GET | ✓ | /hashtag/:hashtag | To retrieve a single hashtag |
| *Comment* | POST | ✓ | /comment/:postId | To create a single comment |

