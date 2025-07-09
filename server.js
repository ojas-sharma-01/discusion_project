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
  "private_key_id": "89fc6cc18879c423f5d86c82e0f8418cb28b3ec5",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDMRS/YE4wWJDkU\ntToQvtti/Sl/yjL5wImr8pC8ZIGTmbhXHFf4Rfoa71f1FZYNUJKU89hAsHk6w7En\nNBC+qpxWXV1SV+0QLjeMnnJrnY4GgcqoSSs5kTj3vXXDXRyHE4t1pR2137TMBYbR\nKWwtU5qjQbl7yNZ38bZBrehgYTiqboz744qXCY84krYhyQO6fduNgkSP3lNblyAM\nns5rFS00t1HvWZAwOj8UKEZCnqR6twvw03X9mTqHhmw5yBzXEwu31a/BTM4Uhx/V\nsMz/zmGIp8vbf/aHwD1m5Znl+A0qqHdDaT/AMQ8GtnmE0UMyT/fDOG23GkT+pmAZ\nga+IG7grAgMBAAECggEANEqt4cm3Pd/OAQAXujuxm9ilLAKOJCNm2u7AoIm2Jhve\n9eXam0MGsKh+ws3g2M28iIcX4A+NKT75dci9VKIGXZGPF0pM9KxwKf5R2jy+I+pL\n/+KjPxxvEfSdVgLbD7UwKVC4l1uKRARSK+9Hsx7I4mwr2IVkadYlyxCDAVFCGVa4\nh9I6+YUbUq5ywF2HMyi4pTN7vtobswZsBMCRB741zS9BGE+JOlYTIfckNhftEDGm\nfB50FE/1IYu0epXmIE/KAjJhimIhMq4SgFy1th7npRZW9L518wth+m/Di+anp60i\nl63yHz2tGoan/1P1ZYMIFO+2tCz4wkL+xiMfdRsP0QKBgQDnZRM7Rs5hmC5lG+OV\nhLh4uMDMo2ErUe5kE2NmTkDxsfjNW5x7TNdWDexuvENlGGAIaAXEUGfVjRilKfNZ\n2AfQelE/DivUtRTKqLcRobW/3qcw5aPE1Yn3pfHfx1OpG5SEW3lfBhYacVUoDVQU\n1D4HxwsfJK3mVk/CAhpAAPR48wKBgQDh/b09PD2bV4S4UF79fycXos+lFdPlM4sO\nDIp/URpHNVWje7Ixl6Laf0dzh3P2+nnyT33fC4nnsbzNse/R/h1HJHyV+yQX5Mpv\nce16UjM3WtbHn0Y33kpG0xlTT0zLuTA0Uvh4v9iDNMd4Gk2TyWkWdBXQRmhy/oZc\nxAPoUIiR6QKBgQCBRmDWLxrCP4k8B7bAI+QD3gQoz+ZLk3yCAKr5zyJNZcbAxDvK\nTwXHGARNYXStmE6eo68FHH7GOgvYynUgbqb+/DdD6SDntzskddnBSf0GctgpY0J5\nh2uLJfTZtrywr63rvEc0pWvX3hVbSQb+lA0Lv1IhVhappvLsSsxrkZ0DrQKBgQCJ\nUzb7Tu/gxX3QwoX2ZJ3MrxKernTkgj2te9FtLEtbmf1AKppNqGc9frpcaaL+IZaY\nt9U1BD34nPitxcKFSHViFbnfKYz1OAILVp+IBQs6R+jbxN1Wda2M/BoXlciEwzOX\nmBOEzI80q43KXbFmbK1/B2t59E7kEeZz2GjHcqiKgQKBgQCzsET4eQTU44WisHll\nHxGipFZY4ym7xJsbasGH1yzAqvMl5EzBZBPwkn6tHPF7Bln0DUmO++Orsr+x15gb\ni8cb/PIWWqykyc7siTR1Ct/ij8TaiHji0Ad/GJvvmPfxNRiNd7Gd2XE5Et7EItiv\ncvUSGaTBpbVytK6VnEi6gN3A8w==\n-----END PRIVATE KEY-----\n",
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
      console.log("dfsdf");
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