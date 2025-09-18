-- Initialize the database with a simple users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO users (name, email) VALUES 
    ('Bobi Galic', 'bobi.galic@yahoo.com'),
    ('Teo Eftimov', 'teo553@gmail.com'),
    ('Martin Grombanovski', 'martingrombanovski@yahoo.com');
