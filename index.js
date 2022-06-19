import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

server.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
  }

  users.push({ username, avatar });
  res.sendStatus(201);
});

server.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  const username = req.header("user");
  const avatar = users.find((user) => user.username === username).avatar;

  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
  }

  tweets.push({ tweet, username, avatar });
  res.sendStatus(201);
});

server.get("/tweets", (req, res) => {
  const page = req.query.page;

  if (!page || parseInt(page) < 1) {
    res.status(400).send("Informe uma página válida!");
  }

  const limit = 10;
  const start = (page - 1) * limit;
  const end = page * limit;

  const lastTweets = [...tweets].reverse().slice(start, end);
  res.send(lastTweets);
});

server.get("/tweets/:username", (req, res) => {
  const { username } = req.params;
  const tweetsUser = tweets.filter((tweet) => tweet.username === username);
  res.send(tweetsUser);
});

server.listen(5000);
