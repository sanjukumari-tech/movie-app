const connection = require("../config/db");
const ensureTable = async (req, res, next) => {
    try {
      await connection.promise().query(`
        CREATE TABLE IF NOT EXISTS Movies (
          id INT PRIMARY KEY AUTO_INCREMENT,
          title VARCHAR(255) NOT NULL,
          genre VARCHAR(100),
          year_of_release YEAR,
          director VARCHAR(255),
          description TEXT,
          status BOOL DEFAULT FALSE
        )
      `);
      next(); // Proceed to the next middleware if successful
    } catch (error) {
      console.error("Error creating table:", error);
      res.status(500).send("Error creating table");
    }
  };
  
module.exports = ensureTable;
