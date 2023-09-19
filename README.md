# connecting

Frontend for a simple picture based social network featuring likes, followers,
comments and hashtags functionality. Images are automatically resized to a
pre-configured resolution — blurred inline margins are generated, if necessary —
and stored in a AWS S3 bucket.

For more information on the backend of this project, see the
[backend repository](https://github.com/davifeliciano/connecting-api).

## Usage

1. Setup and run the backend (follow the instructions on the [backend repository](https://github.com/davifeliciano/connecting-api)).
2. Create a `.env` file from `.env.example` and set the backend URl
3. Install the dependencies with

   ```bash
   $ npm install
   ```

4. Run the development server with

   ```bash
   $ npm run dev
   ```

## Roadmap

- [ ] Auth
  - [X] Access and refresh token authentication
  - [ ] Role based authentication
  - [ ] Github authentication
  - [ ] Password reset
- [X] Users
  - [X] Profile update
- [ ] Posts
  - [X] Post creation
  - [ ] Post deletion
- [x] Upvote system
- [x] Followers system
- [x] Comments system
- [ ] Hashtags system
- [ ] Documentation
