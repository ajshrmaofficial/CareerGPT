const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
    organization: process.env.ORGANISATION_ID,
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/api/chat", async (req, res) => {
  const {prompt} = req.body;
    console.log(prompt);
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 100,
      temperature: 0,
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
