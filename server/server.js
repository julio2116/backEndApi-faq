const express = require("express");
const app = express();
const router = require('../routes/routes.js')

app.use(express.json());

app.use("/api/v1/faq", router);

app.listen(3000, () => {
  console.log("app rodando na porta 3000");
});
