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
    console.log(names);
    res.render("index.ejs", {names:names});
});

app.post("/submit", (req, res) => {
    names.push(req.body.post1);
    res.render("index.ejs", {names:names});
});


app.post("/actions", (req, res) => {
    
    const action = req.body.action;
    const index = req.body.index;
    const value = req.body.postId;
    
    console.log("index " + index);
    console.log("value " + value);


    //delete element on names arrays
    if(action === 'delete'){
        names.splice(index, 1);     
    }else if(action === 'edit'){
        names[index] = value;
        console.log("safasf" + names[index]);
    } 
    console.log(names);

    res.render("index.ejs", {names:names});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  