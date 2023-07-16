const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");
const userModel = require("./schema");

async function connectMongoose() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {dbName: "userDB"});
    console.log("connected to mongoose database");
  } catch (err) {
    console.log(err);
  }
}

connectMongoose();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const configuration = new Configuration({
    organization: process.env.ORGANISATION_ID,
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/api/login", async(req, res) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).send("Username and Password are required");
  try {
    const user = await userModel.findOne({username});
    if(!user) return res.status(400).send("Username/Password is incorrect");
    if(user.password !== password) return res.status(400).send("Username/Password is incorrect");
    res.status(200).send("Login successful");
  } catch (error) {
    console.log(error.message); 
  }
});

app.post("/api/signup", async(req, res) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).send("Username and Password are required");
  try {
    const userExists = await userModel.findOne({username});
    if(userExists) return res.status(400).send("Username already exists");
    await userModel.create({username, password});
    res.send("User created");
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/api/chat", async (req, res) => {
  var {prompt} = req.body;
  if(!prompt) return res.status(400).send("Prompt is required");
  console.log(prompt);
  const tuningPrompt = 'Following is a conversation with an AI assistant who is helpful in giving Career Advice. The assistant specialises in giving advice on the following topics: \n\n1. Career Advice\n2. Job Search\n3. Interview Tips\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I need some career advice\nAI: Sure, I can help you with that. What is your question?\nHuman: ';
  prompt = tuningPrompt + prompt + '\nAI:';
  console.log(prompt);
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 200,
      temperature: 0.5,
      prompt: prompt,
    });
    res.send(completion.data.choices[0].text);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 5000}`);
});
