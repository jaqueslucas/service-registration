
```markdown
# Service Registration

## Overview

This project is a service registration application using a service-oriented architecture (SOA) with a DAO (Data Access Object) design pattern. The application allows creating and listing tickets, storing them in PostgreSQL, MongoDB, and MariaDB databases. The user interface is simple and implemented with plain HTML, CSS, and JavaScript.


## Requirements

- Node.js
- npm
- PostgreSQL
- MongoDB
- MariaDB

## Database Configuration

### PostgreSQL

1. **Install PostgreSQL**: Download and install PostgreSQL from the [official site](https://www.postgresql.org/download/).
2. **Create Database and Table**:
   ```sql
   CREATE DATABASE p3;
   \c p3;
   CREATE TABLE ticket (
       id SERIAL PRIMARY KEY,
       natureza VARCHAR(255) NOT NULL,
       descricao TEXT NOT NULL,
       provedor VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### MongoDB

1. **Install MongoDB**: Download and install MongoDB from the [official site](https://www.mongodb.com/try/download/community).
2. **Start MongoDB**:
   ```bash
   mongod --dbpath /path/to/your/db
   ```
3. **Create Collection**:
   ```javascript
   use p3;
   db.createCollection('ticket');
   ```

### MariaDB

1. **Install MariaDB**: Download and install MariaDB from the [official site](https://mariadb.org/download/).
2. **Create Database and Table**:
   ```sql
   CREATE DATABASE p3;
   USE p3;
   CREATE TABLE ticket (
       id INT AUTO_INCREMENT PRIMARY KEY,
       natureza VARCHAR(255) NOT NULL,
       descricao TEXT NOT NULL,
       provedor VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Installation and Execution

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd service-registration
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Server**:
   ```bash
   ts-node server/src/server.ts
   ```

## User Interface

The user interface is located in the `public` directory and includes:

- `index.html`: Basic HTML structure.
- `styles.css`: Basic styles for the user interface.
- `app.js`: JavaScript to handle form submission and list tickets.

## License

This project is licensed under the MIT License.
```

