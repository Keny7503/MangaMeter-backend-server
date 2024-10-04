import { log } from "console";
import { config as dotenvConfig } from "dotenv";
import sql from "mssql";
import { Table } from "../model/Table.js";

// Load environment variables from .env file
dotenvConfig();



// Define the database configuration using environment variables
const config: sql.config =  {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    server: ""+process.env.DB_SERVER,
    port: 1433, 
    database: process.env.DB_DATABASE, 
    options: {
        encrypt: true
    }
}

console.log("Starting...");

// Function to connect to the SQL server and execute a query
async function connectAndQuery(): Promise<void> {
  try {
    // Connect to the database
    const poolConnection = await sql.connect(config);
    console.log("Reading rows from the Table...");
    
    // SQL Query
    const query = `
      SELECT * FROM Manga`;

    // Execute the query
    const resultSet = await poolConnection.request().query(query);
    console.log(resultSet);

    console.log(`${resultSet.recordset.length} rows returned.`);

    // Output column headers
    const columns = Object.keys(resultSet.recordset.columns).join(", ");
    console.log(columns);

    const table = new Table(resultSet.recordset);
    table.printTable();
    // Output row contents from the default recordset
    // resultSet.recordset.forEach((row: { ID: string; Name: string }) => {
    //   console.log(`${row.ID}\t${row.Name}`);
    // });

    // Close the connection when finished
    await poolConnection.close();
  } catch (err: unknown) {
    console.error("Error querying the database:", err);
  }
}

// Start the query process
connectAndQuery();
