import express from 'express';
const app = express();
import admin  from 'firebase-admin';
import  bp from 'body-parser';
import  cors from 'cors';
import path from 'path';
import authenticateJWT from './authMiddleware.js';
import jwt from 'jsonwebtoken';

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

  const serviceAccount = {
    "type": "service_account",
    "project_id": "billinginv-78309",
    "private_key_id": "db43b0775a5911b3be3acf1eb3baa0d05843d458",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDT84krwolHGmmk\nLJd7UWolkQ4VDMc0QWoFOfdwFyuaUFo9qYsjJVNnSK0mDyILHgj7kBg1E/Uii5qQ\nPSbZb6I+XMmfmJ5xSccU3UFNxM8ikZkzcYsMrlL1AJ2pVmaXv3yAsUZ66eiTVDQE\nWOakjeMMvuxxwzAKaaN3mah4T5ZdkxohHgpkpsKa4I8CCIp7njl3O2AQD2YScsPt\n1WVEWdWOdM9Tb1o4mvON58VK8IIeXqEKaUHi8jVNPgDRaEirvQ+GVGwPBp9/amOO\noq5LR53nz2knbv8xTXEhEZ4QjCQdbSOrmzKEyq10wn8PlEygq+HHcQFlMhzDVkGU\nrpRe8nHPAgMBAAECgf8NPytTkNUDnKL9n8vX6T65GlfG+QV6Ppxhtz2/w7L18g+x\nyubnS23rBp/LwSZfi4EEN/1LU/P+NLt0SF4lONTrEOGJGADPE81dgHaUZbiMcI0i\nqfYG1N5aca9o5f2DfnRJlsrQ482lZ53Yp7XCkxudsFEWyxw1imStFO1yl4bOUkYU\no7Y8zZxnEmPgieVine0VOyc5MABM4gVGOgoPnhr9GLe/9HZrj98c5Jr1/xC3VhC9\nLhZ2OEWioNcLcHtLTVlSOmvl4U6aOLY+20rMCcy4xpeDVyBzP8w/YwdE5IOjo+yq\nT/vKdSh4l39B1wgIVVFfsLEDHs9wOMd6Jn34QAECgYEA/nrgCQYsbf7ewQELsIPK\nxU5Oyk8qXOFvrmhbEgA+Q1KtqIrLDjAcY920ps5oO0XqssKf+xHuiVIB7D8A3rFe\ny3IP5CWHYtofPAyvR7kU+0BwwOCiv75RIaDTJpmkBVBz2lUse50vYfVeXGQ8rOlz\nDYHv/+zqyAsmOxeuvhBopgECgYEA1TehU1Y8wVEVHtIgey+eePZozntxcWLd8wGF\nTqmY6IiL2T3g5ggZ5OP3oNLn23IHbRPcDIwX7kzUec3u/j3T+hsIpeSr9OzWIAja\nzBzpFn4po6fiAsz4V41KDPgrlkqARHKkVUCMHKNkpRXzAcFjOPVf9jtKK8esi04g\nVGKqN88CgYEAkwqU4SH8EiKuu37LLlc4lwFEbYmIxNpOGcyasrAJSgU/6p8n7S7H\neLzmYWvqtjUUA+6JWh1mY1pLWiKdcg+y4oMpw34b2HaIjb4Wma7L/NGjVQ93equR\nXYj7+NXV/GwcRQ/qABM3CbcpquEQXikWHbvy3UIb9zLaCFMK2S/KCAECgYBBPyfQ\nD8jBw6U57EViTP0quQTzgtUBRKb00RdRLhcLuZVKImRrIDmEULqbbU7kWW2qVHR3\nJnvAQaSXrYwgIx12IMWxtltktQEFhpAl/AbcCjmFyj8gakboy+TIOT1lXWEJESf2\nqqz1qo6G8kON2vcZHAWEnToiUZUcgAjmqda7AwKBgGHxgoVtEBv0o2cGqfDRsKus\nAja2Hc+mG1mqZfoooT8DznbMec+Z+r/QONupL4ySG+MD38J77pPcCUSNxYKzIixe\nQCIRm43UHuOtnttRZuMmfI2H5BjNxaWNE2n67YV4UQKZ3pqK6/m/VDpoA5lQ9DS8\n9XffMR/Js0NqVYRsqJps\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-2nr5t@billinginv-78309.iam.gserviceaccount.com",
    "client_id": "117042319334650227378",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2nr5t%40billinginv-78309.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  
  



const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
};

  admin.initializeApp(firebaseConfig);

const db = admin.firestore();



app.post("/authenticateonly", authenticateJWT, async(req, res) => {
  res.send({authenticated: true, user: req.user});
});

app.post("/addthread", authenticateJWT, async(req, res) => {
  try {
    var date = new Date();
    const dt = req.body;
    dt.post_time = {"day" : date.weekdayShort, "time" : date.hour + ":" + date.minute};

    dt.comments = [];
    dt.reactions = {likes : 0, hearts : 0, laughs : 0};

    console.log(dt);
    await db.collection("threads").doc().set(dt);

    res.send("inserted");

  } 
  catch (error) {
    res.send(error); console.log(error);
  }
});

app.get("/getthreads", async (req, res) => {
  try {

    console.log(db);
    
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
        console.log('Successfully created new user:', userRecord.uid);
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

        const jwt_token = jwt.sign({uid: uuu, username: userid}, process.env.JWT_SECRET || 'your_jwt_secret_key', {expiresIn: '1h'});
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
      console.log(profile_data);

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
      console.log(uid);
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

    console.log(uid, user, 'login');
    const jwt_token = jwt.sign({uid: uid, username: username}, process.env.JWT_SECRET || 'your_jwt_secret_key', {expiresIn: '1h'});

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