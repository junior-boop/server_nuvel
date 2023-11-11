DROP TABLE IF EXISTS Images;
CREATE TABLE IF NOT EXISTS Images (
    imageId VARCHAR(20) PRIMARY KEY NOT NULL,
    image_name VARCHAR(255) NOT NULL,
    image_originalname VARCHAR(255) NOT NULL,
    image_lastmodified INTEGER NOT NULL,
    image_size INTEGER NOT NULL,
    image_minetype VARCHAR(255) NOT NULL,
    createdAt INTEGER NOT NULL
)