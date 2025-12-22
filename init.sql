-- Create a new database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS pelitili;

-- Switch to the newly created database
USE pelitili;


CREATE TABLE IF NOT EXISTS players (
    player_id VARCHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    balance DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS game_events (
    event_id VARCHAR(36) NOT NULL PRIMARY KEY,
    event_uuid CHAR(36) NOT NULL UNIQUE,
    player_id VARCHAR(36) NOT NULL,
    event_type ENUM('purchase', 'win') NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    event_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_game_events_player
        FOREIGN KEY (player_id)
        REFERENCES players(player_id)
        ON DELETE CASCADE
);

INSERT INTO players (name, balance)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Matti Meikäläinen', 50.00);

INSERT INTO game_events (event_uuid, player_id, event_type, amount)
VALUES (
    UUID(),
    '550e8400-e29b-41d4-a716-446655440000',
    'win',
    25.00
);