const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

async function connect() {
  if (global.db) return global.db;
  const conn = await MongoClient.connect(
    `mongodb+srv://leonardobraga:${process.env.MONGO_PASSWORD}@cluster0.gc5mpsr.mongodb.net/?retryWrites=true&w=majority`
  );
  if (!conn) return new Error("Erro de conexão ao banco de dados.");
  global.db = await conn.db("weekly");
  return global.db;
}

const express = require("express");
const app = express();
const port = 3000;

app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();

router.post("/auth", async function (req, res, next) {
  try {
    const { email, senha } = req.body;
    const db = await connect();
    const resposta = await db.collection("usuario").findOne({ email, senha });

    if (!resposta)
      res.status(401).json({ erro: "Usuário e/ou senha incorretos." });
    else res.json(resposta);
  } catch (err) {
    res.status(400).json({ erro: `${err}` });
  }
});

app.use("/", router);

app.listen(port);
console.log("Servidor iniciado!");