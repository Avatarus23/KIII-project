# Simple Docker Fullstack App For CI/CD Course

- **Frontend**: React (modern UI for user management)
- **Backend**: Python (Flask API with RESTful endpoints)
- **Database**: PostgreSQL
- **Containerization**: Docker and Docker Compose

## Software needed
- Docker
- Docker Compose

## Quick Start

1. **Clone and navigate to the project directory**

2. **Start the application**
- docker-compose up --build

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Database: localhost:5432

## API Endpoints

- `GET /health` - Health check
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID
- `DELETE /api/users/:id` - Delete user

## Project Structure

├── docker-compose.yml          # Docker services configuration
├── database/
│   └── init.sql               # Database initialization script
├── backend/
│   ├── Dockerfile             # Python backend container
│   ├── requirements.txt       # Python dependencies
│   └── app.py                 # Flask application
└── frontend/
    ├── Dockerfile             # React frontend container
    ├── package.json           # Node.js dependencies
    ├── public/
    │   └── index.html         # HTML template
    └── src/
        ├── index.js           # React entry point
        ├── App.js             # Main React component
        ├── App.css            # Application styles
        └── index.css          # Global styles

## Development

### Running Individual Services

**Database only:**
docker-compose up db

**Backend only:**
cd backend
pip install -r requirements.txt
python app.py

**Frontend only:**
cd frontend
npm install
npm start

### Environment Variables
The application uses these default environment variables:
- `POSTGRES_DB=fullstack_app`
- `POSTGRES_USER=postgres`
- `POSTGRES_PASSWORD=password`
- `REACT_APP_API_URL=http://localhost:8000`

## Stopping the Application
docker-compose down

## To remove volumes (database data):
docker-compose down -v

## Sample Data

The database is initialized with sample users:
- John Doe (john@example.com)
- Jane Smith (jane@example.com)
- Bob Johnson (bob@example.com)
