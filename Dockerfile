# Use the official Python image as a base
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Python script into the container
COPY mqtt_weather_sender.py .

# Install required Python packages
RUN pip install paho-mqtt

# Set the entrypoint to run the script
ENTRYPOINT ["python", "mqtt_weather_sender.py"]
