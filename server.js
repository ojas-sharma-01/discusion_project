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
  "private_key_id": "b87bcd3d73d41db1f77083fa68707c485bdc1b31",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDQGkBm20h915k0\nVkhw1rHvHjIzc4gtSup+Wdozg0hca/s82d80RgMEAlVX5WMHZJpKjGnyX3VvhdRM\n3uGFvFsmS7/sG1/9X0LXXOmfMMFDVvwB54u9G5Ibg0+DiVaYZiWDxCJW0vZaFEzk\nyhKVTWIKm74X7vVeHuXmTYd9BGLMIUT80rhrEoqEPHHM9x037+BuQAyKK0yM3fpM\n5telozUpEiMP4a/Br6g3yQ2MnpaYVQw7HOmM6UZXAR57tUY6QgP880Ayu9a9z7SJ\nJlR4Cvu5XZpUsIJq7A79EfmDOxVWoDk5ZE7pIacQOcmoonyOTV6/k0isggTeOThX\ns7ZjiEJnAgMBAAECggEABJQvSpQUmkA+LLqhSWpP6/T8Icmu+2AknLcZZ/zBgNcX\nZhVdJedMdbAfdJmlfiomgvFn+19CVDvbmf1ldO3aC5OrG2TWzdpkvBxdP5VxCyxE\nyz3vAzAyHMzc2QYSk7Pbq3SLVOG7bev4bShNFF/pglY+7oPhfjqr0E9wZb3M9rTS\niIzFU+uWmuRMcTHdYnsE2cXnmfnJ5Vx+PWNj1AWTM7B28/g92qXdaOpz0oQjtcCZ\n53+4nSY3pR0Euo7ZxKdRsp+qFtSBlSHaPlKmd3cnP2YvzyKWjlgr+0u1ZhoFNKrG\n3qxRTJ6llUjkTrtjvI2oyKjUHe3cWRkxPEZPF+4AkQKBgQDtO3eueA22Ne6c6Zge\n7T1EBp+cxdfq+NegdJjzi5L4kim+TqlC+iGaoGlE5US5PyoUaXkz/KE19bP8HaPg\nMrj7cupGSuCncxVsxetlHV9caO/SnraaPN9dyVlY4QsCMyFbfP4bfAdeXW7BBwor\nrD7jn80EEIcCOUfHWiDp/nuoCwKBgQDgkNXphBOmEAH3a04z2EvC90r6QzD2gBJ+\nb/tM8xzNOwF9LU1nppV/yGWwVmdRHiwYHJ/IlRrUfkxzwH6zKn5RsTSFtmWV+Bkx\nXNBGrdKNdoVa07sdoPXpCpbF8uPb+2BpumnBo8q2x6hPWv3H1s1EY04ee6x+CSb/\nHDCO7TLclQKBgQCYNqnJ9hnGKcCaSX9jiJDgzucmrgKmL1gbCfUBfzKj7xR9mPcd\nlGRvVDF3FSwNOCwFwM8Vviip+KatQ09ckO8D123eADk496xtiGhLDpebMXF/UHqV\naC1hfcmoL2zi0m+6xe49ME2CDKz9iUjLUM9hOa1PyFL36EzX6kpoGPK6lQKBgQC3\ny/M4f8AxL3LclTfZWRORDCOSt0GwztvUHkUZEvWkx8GNOXHb/sznXBZWgDFpg/9k\n8LCaU+c0ufZK2ucYLxRaOmYZdlKorvm3nBZfcs8ctz+oOhkww9fhF6iVdRmnp5Oe\nlVMPiMZWWQ1ZfciuMhGpAnoimuhv83+2VtUrddomDQKBgQCPg84JVV7XMtg93SJF\n7LPC0EOWqptmxB+2Meb2T+3ogm/3Jw3O9FucOFGg3JcfJovUlVUNbynT4Zp/O/P+\nQuKXIqnvMh43ZxgVQudQ4JyAU7tC75XavUd8WtqfaPjhDc2DGcRMjzzM04hz5kQL\ncJ0m6zEIUBx3vAJtMUA10HUJgA==\n-----END PRIVATE KEY-----\n",
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