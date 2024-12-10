# import paho.mqtt.client as mqtt
# import random
# import time
# import json

# # MQTT Broker Configuration
# broker = "broker.hivemq.com"  # You can use any MQTT broker, e.g., "mqtt.eclipse.org"
# port = 1883
# topic = "weather_data"

# # Callback when connection is established
# def on_connect(client, userdata, flags, rc):
#     print("Connected with result code " + str(rc))

# # Create MQTT client
# client = mqtt.Client()
# client.on_connect = on_connect

# # Connect to MQTT Broker
# client.connect(broker, port, 60)

# # Generate weather data once
# weather_data = {
#     "temperature": round(random.uniform(-10, 35), 2),
#     "humidity": random.randint(20, 90),
#     "air_pressure": round(random.uniform(980, 1050), 2),
#     "weather_condition": random.choice(["Clear", "Cloudy", "Rainy", "Stormy", "Foggy"]),
#     "wind_speed": round(random.uniform(0, 50), 2),
#     "wind_direction": random.choice(["North", "South", "East", "West", "Northeast", "Southwest", "Northwest", "Southeast"]),
#     "precipitation": round(random.uniform(0, 50), 2),
#     "cloud_cover": random.randint(0, 100),
#     "visibility": round(random.uniform(1, 10), 2),
#     "dew_point": round(random.uniform(-5, 25), 2),
#     "UV_index": random.randint(0, 10),
#     "moon_phase": random.choice(["New Moon", "First Quarter", "Full Moon", "Last Quarter", "Waning Crescent", "Waxing Crescent", "Waning Gibbous", "Waxing Gibbous"]),
#     "sunrise_time": f"{random.randint(5, 7)}:{random.randint(0, 59):02d}",
#     "sunset_time": f"{random.randint(17, 19)}:{random.randint(0, 59):02d}"
# }

# # Convert to JSON
# payload = json.dumps(weather_data)

# # Publish data to MQTT broker
# client.publish(topic, payload)
# print(f"Published: {payload}")

# # Wait for the message to be sent and then disconnect
# client.loop_forever()



import paho.mqtt.client as mqtt
import random
import time
import json

# MQTT Broker Configuration
broker = "broker.hivemq.com"  # You can use any MQTT broker, e.g., "mqtt.eclipse.org"
port = 1883
topic = "weather_data"

# Callback when connection is established
def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

# Create MQTT client
client = mqtt.Client()
client.on_connect = on_connect

# Connect to MQTT Broker
client.connect(broker, port, 60)

# Generate and send weather data periodically
while True:
    # Generate random weather data
    weather_data = {
    "temperature": round(random.uniform(-10, 35), 2),  # Random temperature between -10 to 35 Celsius
    "humidity": random.randint(20, 90),  # Random humidity between 20% to 90%
    "air_pressure": round(random.uniform(980, 1050), 2),  # Random air pressure between 980 to 1050 hPa
    "weather_condition": random.choice(["Clear", "Cloudy", "Rainy", "Stormy", "Foggy"]),  # Random weather condition
    "wind_speed": round(random.uniform(0, 50), 2),  # Random wind speed in km/h
    "wind_direction": random.choice(["North", "South", "East", "West", "Northeast", "Southwest", "Northwest", "Southeast"]),  # Wind direction
    "precipitation": round(random.uniform(0, 50), 2),  # Random precipitation in mm
    "cloud_cover": random.randint(0, 100),  # Random cloud cover percentage
    "visibility": round(random.uniform(1, 10), 2),  # Random visibility in kilometers
    "dew_point": round(random.uniform(-5, 25), 2),  # Random dew point in Celsius
    "UV_index": random.randint(0, 10),  # Random UV index (0 to 10 scale)
    "moon_phase": random.choice(["New Moon", "First Quarter", "Full Moon", "Last Quarter", "Waning Crescent", "Waxing Crescent", "Waning Gibbous", "Waxing Gibbous"]),  # Moon phase
    "sunrise_time": f"{random.randint(5, 7)}:{random.randint(0, 59):02d}",  # Random sunrise time
    "sunset_time": f"{random.randint(17, 19)}:{random.randint(0, 59):02d}"  # Random sunset time
}

    # Convert to JSON
    payload = json.dumps(weather_data)
    
    # Publish data to MQTT broker
    client.publish(topic, payload)
    print(f"Published: {payload}")
    
    # Wait for 5 seconds before sending next data
    time.sleep(5)

# Disconnect after sending data
client.loop_forever()
