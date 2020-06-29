# Backend-test-MEN
This is a backend-test, it consists of a CRUD with some other functionalities, using MongoDB Atlas, Express, Node JS (MEN)

## Instructions

Build a RESTful API that can create/read/update/delete user data from a persistence store.

1. The API should follow typical RESTful API design pattern.
2. The data should be saved in the DB, use any persistence store, NoSQL DB is preferred.
2. Provide proper API documentation.
3. Proper error handling should be used.

### Bonus

1. Provide proper unit tests.
2. Add a read only endpoint to fetch location information based off the user's address (use NASA or Mapbox APIs)
2. Providing an online demo is welcomed, but not required.

### API design Postman

You can import Api design on Postman with backend-test.postman_collection.json file: 

1 - Now open Postman and click Import.
2 - Select the JSON file. Once the selection is complete, you can see that the JSON file gets imported as a Postman collection in the application.

### API design readme

1. Create one user

    This route inserts a new record in the test.users collection on MongoDB Atlas.
    - Request
        ```bash
        POST http://localhost:3900/users 
        ```
    - Body
        ```json
        {
            "name": "Manolo",
            "dob": "1994-01-22",
            "address": "Av Ejército Nacional 862, Polanco, Polanco II Secc, Miguel Hidalgo, 11550 Ciudad de México, CDMX",
            "description": "very good performance"
        }
        ```
    - Possible returns

        Code | Answer
        ------------ | -------------
        `201 (Created)` | `User created correctly ` 
        `400 (Invalid request)` | `sintax_error`
        `500 (userStored error)` | `Some error occurred while creating user.`
        
2. Read all user

    This route lists all users *.
    - Request
        ```bash
        GET http://localhost:3900/users
        ```
    - Possible returns

        Return an array with all registered users.

        Code | Answer
        ------------ | -------------
        `200 (OK)` | [] 
        `500 (userStored error)` | `Some error occurred while retrieving users.`
        
3. Read one user

    This route gets a specific user by its id.
    
    - Request 
        ```bash
        GET http://localhost:3900/users/:id
        ```
    - Possible returns

        Return an object with a registered user.

        Code | Answer
        ------------ | -------------
        `200 (OK)` | {}
        `404 (Invalid request)` | `user not found with id {id}`
        `500 (userStored error)` | `Error retrieving user with id {id}`
        
4. Update one user

    This route update a specific user by its id.
    - Request 
        ```bash
        PUT http://localhost:3900/users/:id
        ```
    - Body
        ```json
        {
            "name": "Manolo",
            "dob": "1994-01-22",
            "address": "Av Ejército Nacional 862, Polanco, Polanco II Secc, Miguel Hidalgo, 11550 Ciudad de México, CDMX",
            "description": "bad performance"
        }
        ```
    - Possible returns

        Code | Answer
        ------------ | -------------
        `200 (Updated)` | {} 
        `404 (Invalid request)` | `User not found with id {id}`
        `500 (userStored error)` | `Error updating user with id {id}`
        
5. Delete one user

    This route delete a specific user by its id.
    - Request 
        ```bash
        DELETE http://localhost:3900/users/:id
        ```
    - Possible returns

        Code | Answer
        ------------ | -------------
        `200 (Deleted) ` | `User deleted successfully!` 
        `404 (Invalid request)` | `User not found with id {id}`
        `500 (userStored error)` | `Could not delete user with id  {id}`

