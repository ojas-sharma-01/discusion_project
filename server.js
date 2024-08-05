import express from 'express';
import { createRequire } from "module";  const require = createRequire(import.meta.url);
const app = express();
import path from 'path';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
const cron = require('node-cron');
const serviceAccount =  require('./key.json');
import admin from 'firebase-admin';
import bp from 'body-parser';
import cors from 'cors';
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({extended:true}));
const __dirname = dirname(fileURLToPath(import.meta.url));

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
};

app.use(express.static(path.join(__dirname, 'build')));


admin.initializeApp(firebaseConfig);
const db = admin.firestore();


cron.schedule('*/7 * * * *', () => {
  fetch('https://discussion-project.onrender.com/keep-alive').then((res) => res.text()).then((data) => console.log(data)).catch((e) => console.log(e));
});


app.get('/err', (req, res) => {
  res.send("Error");
});


app.get('/keep-alive', (req, res) => {
  res.send('Server is alive');
});

app.post("/addthread", async(req, res) => {
  try {

    var date = new Date();
    const dt = req.body;
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const day = days[new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'Asia/Kolkata' }).format(date)];
    const time = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata', hour12: false }).format(date);
    dt.post_time = { day: day, time: time };

    dt.comments = [];
    dt.reactions = {likes : 0, hearts : 0, laughs : 0};
    await db.collection("threads").doc().set(dt);

    res.send("inserted");

  }
  catch (error) {
    res.send(error); console.log(error);
  }
});

app.get("/getthreads", async (req, res) => {
  try {

    const dt = await db.collection("threads").get();
    const obj = dt.docs.map((i) => ({id : i.id, ...i.data()}));
    /*
    for (const i of dt.docs){
      var obj = {};
      obj = {...i.data(), id : i.id};
      console.log(obj);
    }*/

    res.send(obj);

  }
  catch (error) {
    res.send(error); console.log(error);
  }
});

app.post("/getthread", async(req, res) => {
  try {

    const dt = await db.collection("threads").doc(req.body.id).get().then(d => d.data());

    res.send(dt);

  }
  catch (error) {
    res.send(error); console.log(error);
  }
})


app.post("/addcomment", async(req, res) => {
  try {

    var id = req.body.id;
    delete req.body.id;

    var thr = await db.collection("threads").doc(id).get().then(doc => doc.data());

    req.body.reactions = {likes : 0, dislikes : 0};
    thr["comments"].push(req.body);
    await db.collection("threads").doc(id).set(thr);

    res.send("commented");

  }
  catch (error) {
    res.send(error); console.log(error);
  }
});

app.post('/register', async(req, res) => {
  try{

    const userid = req.body.username;
    const passwd = req.body.passwd;
    const email = req.body.email;

    // console.log(userid, passwd, email);

    admin.auth()
    .createUser({
      email: email,
      emailVerified: false,
      password: passwd,
      displayName: userid,
    })
    .then((userRecord) => {
      console.log('Successfully created new user:', userRecord.uid);
      res.send({
        msg : "Registered",
      });
    })
    .catch((error) => {
      console.log(error);
      if (error.code == "auth/email-already-exists"){
        res.send("User exists");
      }
      else{
        res.send({
          msg : error.message + " Please try again."
        });
      }
    });

  }
  catch(err){
    console.log(err); res.send({
      msg : "Registration failed. Please try again or in some time."
    });
  }
});


app.post("/reaction", async(req, res) => {
  try{

    const type = req.body.type;
    const id = req.body.id;

    var thr = await db.collection("threads").doc(id).get().then(doc => doc.data());
    thr.reactions[type]++;
    await db.collection("threads").doc(id).set(thr);

    res.send("ok");
  }
  catch(e){
    res.send(e); console.log(e);
  }
});



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(5000, () => {console.log("Running");});
