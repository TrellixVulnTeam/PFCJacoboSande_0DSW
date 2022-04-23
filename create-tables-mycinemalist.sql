CREATE DATABASE IF NOT EXISTS mycinemalistdb;

USE mycinemalistdb;

CREATE TABLE tUser (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  encrypted_password VARCHAR(100) NOT NULL,
  active_session_token CHAR(20),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  description VARCHAR(200),
  profile_image VARCHAR(500)
);

CREATE TABLE tContent (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  year INTEGER NOT NULL,
  title VARCHAR(100) NOT NULL,
  sinopsis VARCHAR(500) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  director VARCHAR(50) NOT NULL,
  leading_cast VARCHAR(300) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  content_type VARCHAR(50) NOT NULL,
  image VARCHAR(500) NOT NULL,
  rating FLOAT(4,2) NOT NULL DEFAULT 0
  
);
CREATE TABLE tCommentRating (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  content_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  comment VARCHAR(500) NOT NULL,
  rating VARCHAR(50) NOT NULL DEFAULT 5,
  
  FOREIGN KEY (content_id) REFERENCES tContent(id),
  FOREIGN KEY (user_id) REFERENCES tUser(id)
);

CREATE TABLE tFavorites (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  content_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  
  FOREIGN KEY (content_id) REFERENCES tContent(id),
  FOREIGN KEY (user_id) REFERENCES tUser(id)
);
