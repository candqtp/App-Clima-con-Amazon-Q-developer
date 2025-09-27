const express = require('express');
const cors = require('cors');
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

const app = express();

app.use(cors());
app.use(express.json());

const client = new BedrockRuntimeClient({ region: 'us-east-1' });

app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando' });
});

app.post('/claude', async (req, res) => {
  try {
    const command = new InvokeModelCommand({
      modelId: 'anthropic.claude-3-haiku-20240307-v1:0',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 100,
        system: 'Eres un asistente del clima que responde en español con humor.',
        messages: [{
          role: 'user',
          content: req.body.message || 'Hola'
        }]
      })
    });
    
    const response = await client.send(command);
    const result = JSON.parse(new TextDecoder().decode(response.body));
    
    res.json({ response: result.content[0].text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});