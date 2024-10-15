# Rest-API-Project

<p>This project implements a simple REST API using Node.js to manage a list of clothing items ordered by customers. The API supports basic CRUD (Create, Read, Update, Delete) operations, allowing users to create, retrieve, update, and delete clothing items efficiently.</p>

<strong>Key Features:</strong>

<b>CRUD Operations:</b>
<ul>
  <li>Create: Add new clothing items with details such as name, size, and price.</li>
  <li>Read: Retrieve the list of all clothing items or a specific item by its ID.</li>
  <li>Update: Modify the details of existing clothing items.</li>
  <li>Delete: Remove clothing items from the inventory.</li>
</ul>

<b>Technology Stack:</b>
<ul>
  <li>Node.js: Used to build the server and handle HTTP requests.</li>
  <li>HTTP Module: Utilized to set up the server and manage routing for the API endpoints.</li>
  <li>FS Module: Employed for data storage, allowing the API to read from and write to a JSON file that holds the clothing items.</li>
</ul>

<b>Data Management:</b>
<p>The clothing items are stored in a JSON file, which is read and updated using the FS module. This approach ensures that the data persists across server restarts.</p>

<b>Endpoints:</b>
<ul>
  <li>POST /items: Create a new clothing item.</li>
  <li>GET /items: Retrieve all clothing items.</li>
  <li>GET /items/:id: Retrieve a specific clothing item by its ID.</li>
  <li>PUT /items/:id: Update an existing clothing item.</li>
  <li>DELETE /items/:id: Delete a clothing item by its ID.</li>
</ul>

<b>Implementation Details:</b>
<ul>
  <li>Server Setup: The server is initialized using the HTTP module, listening for incoming requests on a specified port.</li>
  <li>Routing: The API routes are managed to handle different HTTP methods for each CRUD operation.</li>
  <li>Error Handling: Basic error handling is implemented to manage invalid requests and ensure a smooth user experience.</li>
</ul>



