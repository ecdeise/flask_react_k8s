# Base image
FROM python:3.8-slim-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install Tesseract OCR and its dependencies
RUN apt-get update && apt-get install -y tesseract-ocr

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt
RUN pip install gunicorn

# Copy the app code
COPY . .

# Application Environment variables
ARG MODE=DEVELOPMENT
ENV MODE=$MODE
RUN echo "MODE is set to $MODE"

# Expose port 5000 for the Flask app
EXPOSE 5000

# Start the Flask app using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--env", "MODE=DEVELOPMENT", "application:app"]


# # Base image
# FROM python:3.8-slim-buster

# # Set environment variables
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

# # Set the working directory
# WORKDIR /app

# # Copy the requirements file
# COPY requirements.txt .

# # Install dependencies
# RUN pip install -r requirements.txt
# RUN pip install gunicorn

# # Copy the app code
# COPY . .

# # Application Environment variables
# ARG MODE=PRODUCTION
# ENV MODE=$MODE
# RUN echo "MODE is set to $MODE"

# # Expose port 5000 for the Flask app
# EXPOSE 5000

# # Start the Flask app using Gunicorn
# CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--env", "MODE=PRODUCTION", "application:app"]



# FROM python:3.8-slim-buster

# WORKDIR /app

# RUN ls
# RUN echo "Current context: $PWD"

# COPY requirements.txt requirements.txt
# RUN pip3 install -r requirements.txt

# COPY . .

# CMD [ "python3", "app.py" ]
