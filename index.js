import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { name } from "ejs";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const notes = ["Work Tasks:\n\n Check emails and respond \n\n Complete project report for the meeting at 11 AM \n\n Attend the 2 PM team meeting", "POST2"]; 

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    console.log(notes);
    res.render("index.ejs", {notes:notes});
});

app.post("/submit", (req, res) => {
    notes.push("");
    res.redirect("/");
    //res.render("index.ejs", {notes:notes});
});


app.post("/actions", (req, res) => {
    
    const action = req.body.action;
    const index = req.body.index;
    const value = req.body.postId;
    
    console.log("index " + index);
    console.log("value " + value);


    //delete element on notes arrays
    if(action === 'delete'){
        notes.splice(index, 1);     
    }else if(action === 'edit'){
        notes[index] = value;
        console.log("edit" + notes[index] + index);
    } 
    console.log(notes);

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  