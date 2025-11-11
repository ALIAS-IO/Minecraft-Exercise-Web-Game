const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
}

bcrypt.hash('1234', saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);

    const SQLSTATEMENT = `

    DROP TABLE IF EXISTS User;

    CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    skillpoints INT DEFAULT 0
    );

    INSERT INTO User (user_id, username, email, password) VALUES
      (0, 'admin', 'a@a.com', '${hash}');

    DROP TABLE IF EXISTS FitnessChallenge;

    CREATE TABLE FitnessChallenge (
    challenge_id INT AUTO_INCREMENT PRIMARY KEY,
    challenge TEXT NOT NULL,
    creator_id INT NOT NULL,
    skillpoints INT NOT NULL
    );

    INSERT INTO FitnessChallenge (creator_id, challenge, skillpoints)
    VALUES 
        (1, 'Complete 2.4km within 15 minutes', 50),
        (1, 'Cycle around the island for at least 50km', 100),
        (1, 'Complete a full marathon (42.2km)', 200),
        (1, 'Hold a plank for 5 minutes', 50),
        (1, 'Perform 100 push-ups in one session', 75);

    DROP TABLE IF EXISTS UserCompletion;

    CREATE TABLE UserCompletion (
    complete_id INT AUTO_INCREMENT PRIMARY KEY,
    challenge_id INT NOT NULL,
    user_id INT NOT NULL,
    completed BOOL NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
    );

    DROP TABLE IF EXISTS UserModifiers;

    CREATE TABLE UserModifiers (
        user_id INT NOT NULL,
        current_upgrade_level INT DEFAULT 0,
        current_active_booster INT DEFAULT 0,
        no_of_boosted_challenges_left INT DEFAULT 0,
        total_minions INT DEFAULT 0
    );

    DROP TABLE IF EXISTS TempBoosterShop;

    CREATE TABLE TempBoosterShop (
        booster_id INT,
        description TEXT,
        type TEXT,
        stats FLOAT,
        duration INT,
        price INT,
        purchasable BOOLEAN,
        level_requirement INT
    );

    INSERT INTO TempBoosterShop (booster_id, description, type, stats, duration, price, purchasable, level_requirement)
    VALUES 
        (0, "No boost", "Add", 0, 0, 0, false, 0),
        (1, "Gain +10 more skillpoints for the next 5 challenges", "Add", 10, 5, 15, true, 0),
        (2, "Gain +20 more skillpoints for the next 10 challenges", "Add", 20, 10, 65, true, 1),
        (3, "Gain x2 skillpoints for the next 10 challenges", "Multiply", 2, 10, 125, true, 2),
        (4, "Gain x5 skillpoints for the next 8 challenges", "Multiply", 5, 8, 500, true, 3);

    DROP TABLE IF EXISTS PermaUpgradeShop;

    CREATE TABLE PermaUpgradeShop (
        upgrade_level INT,
        description TEXT,
        stats FLOAT,
        price INT,
        purchasable BOOLEAN,
        level_requirement INT
    );

    INSERT INTO PermaUpgradeShop (upgrade_level, description, stats, price, purchasable, level_requirement)
    VALUES 
        (0, "Base x1.0 multiplier", 1.0, 0, false, 0),
        (1, "Gain a x1.2 multiplier for skillpoints", 1.2, 80, true, 0),
        (2, "Gain a x1.4 multiplier for skillpoints", 1.4, 160, true, 1),
        (3, "Gain a x1.6 multiplier for skillpoints", 1.6, 320, true, 2),
        (4, "Gain a x1.8 multiplier for skillpoints", 1.8, 640, true, 3),
        (5, "Gain a x2.0 multiplier for skillpoints", 2.0, 1280, true, 4);

    DROP TABLE IF EXISTS MinionShop;

    CREATE TABLE MinionShop (
        minion_id INT PRIMARY KEY AUTO_INCREMENT,
        minion_name TEXT,
        title TEXT,
        description TEXT,
        price INT,
        level_requirement INT
        
    );

    INSERT INTO MinionShop (description, minion_name, title, price, level_requirement)
    VALUES 
        ("Purchase a Farming Minion", "Farming Minion", "Farmer", 0, 1),
        ("Purchase a Foraging Minion", "Foraging Minion", "Forager", 250, 2),
        ("Purchase a Mining Minion", "Mining Minion", "Miner", 500, 3),
        ("Purchase a Combat Minion", "Combat Minion", "Hunter", 750, 4),
        ("Purchase a Fishing Minion", "Fishing Minion", "Baiter", 1000, 5);


    DROP TABLE IF EXISTS Minions;

    CREATE TABLE Minions (
        minion_id INT,
        user_id INT NOT NULL,
        minion_name TEXT,
        minion_level INT DEFAULT 0,
        title TEXT,
        current_active_booster INT DEFAULT 0,
        booster_duration TIMESTAMP,
        resources_collected INT DEFAULT 0,
        bought_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_checked_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    DROP TABLE IF EXISTS MinionBoosterShop;

    CREATE TABLE MinionBoosterShop (
        booster_id INT,
        description TEXT,
        type TEXT,
        stats FLOAT,
        duration TIME,
        price INT,
        purchasable BOOLEAN,
        level_requirement INT
    );

    INSERT INTO MinionBoosterShop (booster_id, description, type, stats, duration, price, purchasable, level_requirement)
    VALUES
        (0, "No boost", "Add", 0, "00:00:00", 0, false, 0),
        (1, "Gain +5 more resources per hour for 48 hours", "Add", 5, "48:00:00", 250, true, 0),
        (2, "Gain +25 more resources per hour for 48 hours", "Add", 25, "48:00:00", 750, true, 1),
        (3, "Gain x1.5 resources for 48 hours", "Multiply", 1.5, "48:00:00", 1000, true, 2),
        (4, "Gain x3 resources for 48 hours", "Multiply", 3, "48:00:00", 2000, true, 3);

    DROP TABLE IF EXISTS MinionUpgradeShop;

    CREATE TABLE MinionUpgradeShop (
        upgrade_level INT,
        description TEXT,
        stats FLOAT,
        price INT,
        purchasable BOOLEAN,
        level_requirement INT
    );

    INSERT INTO MinionUpgradeShop (upgrade_level, description, stats, price, purchasable, level_requirement)
    VALUES
        (0, "Earn 1 resource every 10 seconds", 1.0, 0, false, 0),
        (1, "Earn x2.0 more resources", 2.0, 200, true, 0),
        (2, "Earn x4.0 more resources", 4.0, 800, true, 1),
        (3, "Earn x6.0 more resources", 6.0, 3200, true, 2),
        (4, "Earn x8.0 more resources", 8.0, 12800, true, 3),
        (5, "Earn x10.0 more resources", 10.0, 51200, true, 4);

    DROP TABLE IF EXISTS MinionRank;

    CREATE TABLE MinionRank (
        rank_id INT PRIMARY KEY AUTO_INCREMENT,
        total_resources_needed INT,
        rank_title TEXT
    );

    INSERT INTO MinionRank (total_resources_needed, rank_title)
    VALUES
        (500000000, "Master"),
        (40000000, "Elite"),
        (3000000, "Expert"),
        (200000, "Apprentice"),
        (10000, "Novice"),
        (0, "Starter");

    DROP TABLE IF EXISTS Reviews;

    CREATE TABLE Reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    challenge_id INT NOT NULL,
    challenge TEXT NOT NULL,
    user_id INT NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_edited_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    `;

    pool.query(SQLSTATEMENT, callback);
  }
});
