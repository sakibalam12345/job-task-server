const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@job-task.qr3gtpu.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const taskcollection = client.db('Alltask').collection('task');

    // all task api
    app.post('/task',async(req,res)=>{
      const user = req.body;
      const result = await taskcollection.insertOne(user)
       res.send(result)
    })

    app.get('/task',async(req,res)=>{
      const result = await taskcollection.find().toArray();
      res.send(result)
    })
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',async (req,res)=>{
    res.send('task management is coming')
})

app.listen(port, ()=>{
    console.log(`port is running in ${port}`)
})