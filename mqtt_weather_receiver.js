import mqtt from 'mqtt';
import ollama from 'ollama';  // Import the Ollama SDK
import Cerebras from '@cerebras/cerebras_cloud_sdk';
import { WebSocketServer } from 'ws';  // Import WebSocketServer from 'ws'

// Initialize Cerebras client with API key
const cerebrasClient = new Cerebras({
  apiKey: 'csk-freexmn4nm65fjnc6pvwvh4nvmrtyweeerp2v4demkjdwx9v',
});

// MQTT Broker Configuration
const broker = "mqtt://broker.hivemq.com";  // Match this with the Python script's broker
const topic = "weather_data";

// WebSocket Server Setup
const wss = new WebSocketServer({ port:9000 });  // WebSocket server on port 8080

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket server');
  
  // Optionally send a welcome message to the client
  ws.send(JSON.stringify({ message: 'Connected to WebSocket server' }));
});

// Connect to the MQTT Broker
const client = mqtt.connect(broker);

// When the connection is established
client.on('connect', () => {
  console.log('Connected to MQTT broker');
  
  // Subscribe to the topic
  client.subscribe(topic, (err) => {
    if (err) {
      console.log('Subscription failed:', err);
    } else {
      console.log(`Subscribed to topic: ${topic}`);
    }
  });
});

// When a new message is received
client.on('message', async (topic, message) => {
  console.log(`Received message on topic: ${topic}`);
  
  // Parse the JSON payload
  const weatherData = JSON.parse(message.toString());
  
  // Log the weather data
  console.log("Weather Data:", weatherData);

  // Prepare the prompt for Cerebras
  const prompt = `Given the following weather data, can you provide a detailed analysis? The data includes the current temperature, humidity, air pressure, weather condition, wind speed and direction, precipitation, cloud cover, visibility, dew point, UV index, moon phase, and sunrise/sunset times: ${JSON.stringify(weatherData)}`;

  try {
    const startTime = Date.now();
    
    // Call Cerebras API for summarization
    const completionCreateResponse = await cerebrasClient.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3.1-8b',  // Replace with the model you're using
    });

    const endTime = Date.now();

    // Calculate the duration
    const duration = endTime - startTime;

    // Log the response content from Cerebras
    console.log("Cerebras response:", completionCreateResponse);
    console.log("Time taken by Cerebras to respond:", duration, "ms");
    
    const responseText = completionCreateResponse.choices[0].message.content;
    console.log("Response Text:", responseText);

    // Send the response to WebSocket clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          weatherData: weatherData,      // Send weather data as a separate field
          weatherAnalysis: responseText  // Send the analysis as a separate field
        }));
      }
    });
  } catch (error) {
    console.error("Error while fetching Cerebras response:", error);
  }
});

// Error handling for MQTT
client.on('error', (err) => {
  console.log('Error:', err);
});
