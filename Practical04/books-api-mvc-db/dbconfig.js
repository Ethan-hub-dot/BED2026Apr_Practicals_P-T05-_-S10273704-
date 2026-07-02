module.exports = {
  user: "booksapi_student", // Replace with your SQL Server login username
  password: "booksapiuser", // Replace with your SQL Server login password
  server: "localhost",
  database: "bed_db",
  trustServerCertificate: true,
  options: {
    port: 1433, // Default SQL Server port
    connectionTimeout: 60000, // Connection timeout in milliseconds
  },
};

module.exports = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  trustServerCertificate: true,
  options: {
    port: parseInt(process.env.DB_PORT), // Default SQL Server port
    connectionTimeout: 60000, // Connection timeout in milliseconds
  },
};