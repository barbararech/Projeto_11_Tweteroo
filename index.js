import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

server.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  users.push({ username, avatar });
  console.log(users);
  res.send("OK");
});

server.post("/tweets", (req, res) => {
  const tweet = req.body.tweet;
  const username = req.body.username;
  const user = users.find((user) => user.username === username);
  const avatar = user.avatar;
  tweets.push({ tweet, username, avatar });
  console.log(avatar);
  res.send("OK");
});

server.get("/tweets", (req, res) => {
  const lastTweets = tweets.slice(Math.max(tweets.length - 10, 0));
  console.log(lastTweets);
  res.send(lastTweets);
});

server.listen(5000);
