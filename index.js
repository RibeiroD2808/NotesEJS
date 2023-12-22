import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { name } from "ejs";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const names = ["POST1", "POST2"]; 

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {names:names});
});

app.post("/submit", (req, res) => {
    names.push(req.body.post1);
    res.render("index.ejs", {names:names});
});


app.post("/delete", (req, res) => {
    //delete element on names
    let index = names.indexOf(req.body.postId);
    console.log(req.body.postId);
    names.splice(index, 1);
    res.render("index.ejs", {names:names});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  