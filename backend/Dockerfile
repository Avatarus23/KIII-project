#minimal Python 3.11 env
FROM python:3.11-slim
#label
LABEL maintainer="bobi.galic@yahoo.com"
#set workdir where all subsequent commands will be executed inside
WORKDIR /app
#system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*
#copy requirements and install all Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
#copy application code
COPY . .
#expose port
EXPOSE 8000
#command to run the app
CMD ["python", "app.py"]
