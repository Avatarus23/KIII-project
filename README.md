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
- Bobi Galic (bobi.galic@yahoo.com)
- Teo Eftimov (teo553@gmail.com)
- Martin Grombanovski (martingrombanovski@yahoo.com)


## Starting k3d

# START

k3d cluster create kiii-cluster \
  --servers 1 --agents 2 \
  -p "80:80@loadbalancer" \
  -p "443:443@loadbalancer" \
  --k3s-arg "--disable=traefik@server:0"


# Install ingress controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

kubectl get pods -n ingress-nginx

kubectl get svc -n ingress-nginx

kubectl patch svc ingress-nginx-controller -n ingress-nginx   -p '{"spec": {"type": "NodePort"}}'

kubectl get nodes


kubectl apply -k ./k8s

kubectl get pods -n kiii-project --watch
kubectl get svc -n kiii-project
kubectl get ingress -n kiii-project


# END
k3d cluster delete kiii-cluster