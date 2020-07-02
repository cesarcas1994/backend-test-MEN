# Backend-test-MEN
This is a backend-test, it consists of a CRUD with some other functionalities, using MongoDB Atlas, Express, Node JS (MEN)

MongoDB Atlas database is stored in microsoft Azure Cloud on region / Virginia (eastus2) with a open access. 

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

## How to start

Open the project directory in the terminal and type the commands below

```bash
npm install
npm start
```

### API Cloud version

In order to put the application online, a web application was created in azure using a CD with this repository.

so to test the online api you should only change:

"http://localhost:3900/" for "https://backend-test-men.azurewebsites.net/"

example(Read all user): GET https://backend-test-men.azurewebsites.net/users 

### API design Postman

You can import Api design on Postman with backend-test.postman_collection.json file: 

1. Now open Postman and click Import.
2. Select the JSON file. Once the selection is complete, you can see that the JSON file gets imported as a Postman collection in the application.

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

#### extra api 

1. Read one user mapbox coordinates

    This route gets a specific user mapbox coordinates for its address by its ids.
    
    - Request 
        ```bash
        GET http://localhost:3900/users/mapbox/:id
        ```
    - Possible returns

        Return an object with a registered user.

        Code | Answer
        ------------ | -------------
        `200 (OK)` | {}
        `404 (Invalid request)` | `user not found with id {id}`
        `500 (userStored error)` | `Error retrieving user with id {id}`

#### Test API

Mocha-Chai-mockgoose libraries were used to test the api without changing it, eg using post would not upload an item to the database since mockgoose creates a kind of layer that does not alter the database.

```bash
npm run test 
```

#### API Cloud version design

CI-CD: Objective any changes made to the master branch of the github repository of backend-test-MEN will be automatically reflected in the Azure application where it is stored allowing a CD (Continuous Deployment)

1- Create pipeline connecting (github repository <-> azure devops pipeline <-> azure container registry) every time a change its made on the master branch of the repository it will be send has build to azure container registry, (azure equivalent to docker hub). 


2- An azure web app service was created to host the application container, it was placed in the East Us region to guarantee a better connection with MongoDB Atlas stored in virginia usa. This is connected through webhook (azure container registry <-> webhook <-> azure docker web app service).

time of a build about 60 seconds 


###### API Cloud version design (Show links) 

extra:

https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/containers/acr-template?view=azure-devops

https://docs.microsoft.com/en-us/azure/app-service/containers/app-service-linux-ci-cd


