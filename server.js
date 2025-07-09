import express from 'express';
const app = express();
import admin  from 'firebase-admin';
import  bp from 'body-parser';
import  cors from 'cors';
import path from 'path';
import authenticateJWT from './authMiddleware.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const details = {
  "uid" : "NIL",
  "name" : "NIL",
  "age" : "NIL",
  "email" : "NIL",
  "Occupation" : "NIL",
  "Married": "NIL",
  "Bio" : "NIL",
  "Full_Name" : "NIL",
  "Linkedin" : "NIL",
  "Github" : "NIL",
  "Instagram" : "NIL",
  "username" : "NIL",
  "profile_pic" : "",
};

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({extended:true}));
app.use(express.static(path.join(process.cwd(), 'build')));


admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "billinginv-78309",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const db = admin.firestore();



app.post("/authenticateonly", authenticateJWT, async(req, res) => {
  res.send({authenticated: true, user: req.user});
});

app.post("/addthread", authenticateJWT, async(req, res) => {
  try {
    var date = new Date();
    const dt = req.body;
    
    const adjusted_date = new Date(date.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
    dt.post_time = {
      "day" : days[adjusted_date.getDay()], 
      "time" : adjusted_date.getHours() + ":" + (adjusted_date.getMinutes() < 10 ? '0' : '') + adjusted_date.getMinutes(),
      "year" : adjusted_date.getFullYear(),
    };

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


app.post("/addcomment", authenticateJWT, async(req, res) => {
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
      var uuu;
      admin.auth()
      .createUser({
        email: email,
        emailVerified: false,
        password: passwd,
        displayName: userid,
      })
      .then(async (userRecord) => {
        uuu = userRecord.uid;
        // client.db("test").createCollection(uuu);

        await db.collection("profile").doc(uuu).set({
          uid : uuu,
          name : "NIL",
          age : "NIL",
          email : email,
          Occupation : "NIL",
          Married: "No",
          Bio : "NIL",
          Full_Name : "NIL",
          Linkedin : "NIL",
          Github : "NIL",
          Instagram : "NIL",
          username : userid,
          profile_pic : ""
      });

        const jwt_token = jwt.sign({uid: uuu, username: userid}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.send(
            {msg : "Registered",
            uuid : uuu,
            jwt_token : jwt_token,
        }
        );
      })
      .catch((error) => {
        console.log(error);
        if (error.code == "auth/email-already-exists"){
          res.send({
            msg : "User exists, Please try again",
            uuid : "",
          });
        }
        else{
            console.log(error);
            res.send({
                msg : error.message + " Please try again",
                uuid : "",
              });
        }
      });

  }
  catch(err){
    console.log(err); res.send(err, "Registration failed");
  }
});

app.get("/getprofile/:uid", async(rq, rs) => {
  try{
      // console.log("dfsdf");
      const uuid = rq.params.uid;
      const profile_data = (await db.collection("profile").doc(uuid).get()).data();

      rs.send({
          msg : profile_data
      });
  } 
  catch(e){
      console.log(e);
      rs.send({
          msg : "Error"
      })
  }
});

app.post("/update_profile", authenticateJWT, async(rq, rs) => {
  try{
      const data = rq.body;
      const uid = rq.body.uid;
      delete data.uid;
      await db.collection("profile").doc(uid).set(data);
      // console.log(data);
      
      rs.send({
          msg : "Success",
      })
  }
  catch(e){
      console.log(e);
      rs.send({
          msg : e
      })
  }
});

app.post('/login', async(req, res) => {
  try{
    
    const {token, username} = req.body;
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    const user = decodedToken.displayName;

    const jwt_token = jwt.sign({uid: uid, username: username}, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.send({
      msg : "Login Successfull",
      username : username,
      uid : uid,
      jwt_token : jwt_token,
    }
  )
  }
  catch(err){
    console.log(err);
    res.send({
      msg : "Login Failed",
      email : "",
      username : "",
      uid : "",
    })
  }
});

app.post("/reaction", authenticateJWT, async(req, res) => {
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
  res.sendFile(path.join(process.cwd(), 'build', 'index.html'));
});



app.listen(5000, () => {console.log("Running")});