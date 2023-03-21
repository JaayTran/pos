# Restaurant POS
Welcome to my Restaurant Point-of-Sale System.

## Made by
Jimmy Tran

# Table of Contents
- [Restaurant POS](#restaurant-pos)
- [Media](#media)
- [Table of Contents](#table-of-contents)
- [Scripts](#scripts)
  - [Running](#running)
- [Environment Variables](#environment-variables)
- [Tech-Stack](#tech-stack)
  - [Back-End Dependencies ```(Production)```](#back-end-dependencies-production)
    - [Cors](#cors)
	- [Crypto-JS](#crypto-js)
    - [Express](#expressjs)
    - [JSON Web Token](#json-web-token)
	- [Moment](#moment)
    - [MongoDB](#mongodb)
    - [Mongoose](#mongoose)
  - [Back-End Dependencies ```(Development)```](#back-end-dependencies-development)
    - [Concurrently](#concurrently)
    - [Morgan](#morgan)
    - [Nodemon](#nodemon)
  - [Front-End Dependencies ```(Production)```](#front-end-dependencies-production)
    - [Antd](#antd)
    - [Axios](#axios)
    - [React](#react)
    - [Redux](#redux)
    - [Redux Thunk](#redux-thunk)
    - [React Connected Router](#react-connected-router)

- [API Documentation](#api-documentation)
  - [Backend API](#backend-api)
    - [Auth Token Payload](#auth-token-payload)
    - [Employee Routes](#employee-routes)
      - [Register User](#register-user)
      - [Login User](#login-user)
      - [Get Users](#get-users)
      - [Update Users](#update-users)
      - [Delete Users](#delete-user)
      - [User Logout](#user-logout)
    - [Item Routes](#item-routes)
      - [Add Item](#add-item)
      - [Get All Items](#get-all-items)
      - [Update Item](#update-item)
    - [Table Routes](#table-routes)
      - [Add Table](#add-table)
      - [Get All Tables](#get-all-tables)
      - [Update Tables](#update-tables)
      - [Delete Table](#delete-table)
    - [Bill Routes](#bill-routes)
      - [Add Bill](#add-bill)
      - [Get All Bills](#get-bills)
      
      
      # Media
![Table Bill](https://user-images.githubusercontent.com/38023521/226503915-e390052b-e0d4-4bfd-a211-b7eae2d88e1f.PNG)
![Add or Edit Product](https://user-images.githubusercontent.com/38023521/226503917-607a5d2b-8a17-424a-8c0f-7dd6c51eb71b.PNG)
![Add or Edit Table](https://user-images.githubusercontent.com/38023521/226503919-0a5141fe-707b-4bf4-b450-86ef6e2c8f10.PNG)
![Add or Edit Users](https://user-images.githubusercontent.com/38023521/226503920-ec3e4919-da8c-4e65-8f12-08fe3832048c.PNG)
![Admin View TableScreen](https://user-images.githubusercontent.com/38023521/226503922-cc090095-9ecb-4b7a-a9d7-8c803fb8ad70.PNG)
![Bills Viewed in Date Range](https://user-images.githubusercontent.com/38023521/226503924-fb6e3070-e896-4b0c-979a-99cf379cc482.PNG)
![Login](https://user-images.githubusercontent.com/38023521/226503925-cb94de36-c5f9-4b40-a83c-9ae8df20cb76.PNG)
![Non Admin View TableScreen](https://user-images.githubusercontent.com/38023521/226503926-c273fa1a-31b9-4067-b17f-a9ef3a64f550.PNG)
![Table Pos Screen](https://user-images.githubusercontent.com/38023521/226503928-d4cd0ebf-4c26-4f38-99a3-79e5e09792df.PNG)


# Scripts

## Running

`npm run installdepend`: installs all packages in frontend and backend folder from the main folder.

`npm run dev`: Runs both the front and back ends.

# Environment Variables

`MONGO_URI`: URL for the database

`PASS_SEC`: Secret Key for encrypting passwords when storing them in database.

# Tech-Stack

## Back-End Dependencies ```(Production)```

### Cors

Used to configure API security. This was used to allow for secure communication between the front-end and back-end servers. | [View Dependency](https://github.com/expressjs/cors)


### Crypto-JS

Crypto-JS is a growing collection of standard and secure cryptographic algorithms implemented in JavaScript using best practices and patterns. I used it to encrypt password data. | [View Dependency](https://www.npmjs.com/package/crypto-js)


### ExpressJS

A prebuilt NodeJS framework that makes creating server side applications simple, fast, and flexible. NodeJS is powered by Google's V8 Engine which means it's powerful and can handle a large number of requests without lapsing in dependability. Also, this means that this is a highly scalable choice when you consider the Event Loop which manages all asynchronous operations allowing the program to continue to run as expected without stops. | [View Dependency](http://expressjs.com/)

### Moment

Moment used to format dates to be more readable. [View Dependency](https://github.com/moment/moment)

### MongoDB

MongoDB is an object-oriented, simple, dynamic, and scalable NoSQL database. Due to the minimal about of data relationships I felt this was a good choice for my POS. | [View Dependency](https://docs.mongodb.com/)

### Mongoose

Provides a straight-forward, schema-based solution to model application data with MongoDB. It also offers out of the box perks such as validation. | [View Dependency](https://mongoosejs.com/)

### JSON Web Token

Realizing that there is not inherent benefit to using tokens over sessions, I chose to implement jwts due to the added benefit of storing the session on the client side as opposed to being in-memory. My POS is built with the active server in mind and the potential to have the application be accessed from various devices in different locations. With this, instead of running the risk of having a session be interrupted due to data roaming, connection issues, or server side problems, I chose to store the session information on the client side. We also found this to be more efficient for our needs, as jwts eliminate the need to fetch additional information from the DB to validate the user. This being said, I am in the process of changing over the local storage to online database storage for learning purposes. | [View Dependency](https://www.npmjs.com/package/jsonwebtoken)

## Back-End Dependencies ```(Development)```

### Concurrently

This provides the ability to conveniently run both the back-end and front-end servers simultaneously on one terminal, which makes keeping track of errors easy during development as well as cutting back on time switching between terminals. | [View Dependency](https://www.npmjs.com/package/concurrently)

### Morgan

An HTTP request logging middleware used for production to easily identify bugs in routes. | [View Dependency](https://github.com/expressjs/morgan)

### Nodemon

Automatically restarts the server on save making production more efficient. | [View Dependency](https://nodemon.io/)

## Front-End Dependencies ```(Production)```

### Antd

Has a thriving community and offers the ability to directly style multiple components within a file. The syntax used is familiar to JavaScript and improves code cleanliness and makes it easy to get up and going for those without a lot of css experience. Styled components are also very efficient, improving load time for users. | [View Dependency](https://ant.design/docs/react/introduce)

### Axios

A lightweight, promise-based HTTP client with an intuitive API that makes interfacing with a REST API simple. | [View Dependency](https://www.npmjs.com/package/react-axios)


### React

React is the current industry standard that offers a lot of out of the box benefits. It is fast, efficient, and scalable. Due to the large community, finding solutions to potential problems and reference material is much easier, even for a potential dev without a lot of experience who would like to contribute to application. | [View Dependency](https://reactjs.org/docs/getting-started.html)

### Redux

A state management tool making it possible to store the entire state of the application in a single store. This means a unidirectional data flow, and as the application scales it will have predictable state updates which subsequently make things easier to test and introduce new features. Redux also has solid documentation and an active community, meaning that as new devs become introduced to the project it's likely that any problems they face would have already been encountered by someone else, thus making solutions easy to find. | [View Dependency](https://redux.js.org/)

### Redux Thunk

A middleware that allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. This functionality makes it easier to scale and implement features given diverse needs in a growing project. | [View Dependency](https://github.com/reduxjs/redux-thunk)


### Connected React Router

Allows for the ability to synchronize state with redux store through uni-directional data flow, time traveling, and dispatching of history methods. This makes for an incredibly useful tool when dealing with various stages of state and subsequent routing for a seamless and intuitive UI. | [View Dependency](https://www.npmjs.com/package/connected-react-router)

# API Documentation

## Backend API

### Employee Routes

#### Register User

POST `/api/users/register`

**Requires:** Authentication, must be an admin or a manager to see the users page.

Registers a new employee.

Request body should look like this:

```
{
name:"Jimmy"
loginNumber:"123"
password:"123"
isAdmin:"true"
}
```

`name`: String, required

`loginNumber`: String, required

`pass`: String, required

`isAdmin`: Boolean, required

Password will be protected in responsee via CryptoJS

Response:

```
{
createdAt: "the date user was registered"
isAdmin:true
loginNumber:"1528"
name:"Admin"
password: "U2FsdGVkX1932LX4ffxvKk3VJY5xtIlSUZnNSPhEUhY"
updatedAt: "the date user information was updated"
__v: 0
_id: "63e4067d2d1a17c769b0257a"
}
```

#### Login Employee

POST `/api/users/login`

Logs an existing user into the application.

Request body should look like this:

```
{
  "loginNumber": "123",
  "password": "123"
}
```

`loginNumber`: String, required

`password`: String, required

Password will be protected in responsee via CryptoJS

Response:

```
{
createdAt: "the date user was registered"
isAdmin:true
loginNumber:"1528"
name:"Admin"
password: "U2FsdGVkX1932LX4ffxvKk3VJY5xtIlSUZnNSPhEUhY"
updatedAt: "the date user information was updated"
__v: 0
_id: "63e4067d2d1a17c769b0257a"
}
```

#### Get Users

GET `/api/users/getusers`

**Requires:** Authorization

Retrieves a list of employees from the database. Admins can see all employees in the restaurant, managers can see only servers.

Response:

```
{
  "users": [
    {
        "_id": "63e4067d2d1a17c769b0257a",
        "name": "Admin",
        "password": "U2FsdGVkX1932LX4ffxvKk3VJY5xtIlSUZnNSPhEUhY",
        "createdAt": "the date user was registered",
        "updatedAt": "the date user was updated",
        "__v": 0,
        "loginNumber": "1",
        "isAdmin": true
    },
    {
        "_id": "63e40fa28ec0c7005c4412f2",
        "name": "User",
        "password": "O2ssdGVkX1932LX4ffxvKk3VJY5xX1932LX4ffxvUwZ",
        "isAdmin": false,
        "createdAt": "the date user was registered",
        "updatedAt": "the date user was updated",
        "__v": 0,
        "loginNumber": "2"
    }
]
}
```

#### Update Employee

PUT `/api/users/updateuser`

**Requires:** Authorization

Changes the name, login number, password or admin permission for the user. only a current admin can access user page.

Request body should look like this:

```
{
  "name": "New Name",
  "loginNumber": "1234",
  "password": "New Password"
  "isAdmin": "true or false"
}
```

`name`: String, optional

`loginNumber`: String, optional

`password`: String, optional,

`isAdmin`: String, optional

Everything is optional because it is not required to update a user.

Response will be a success message.

Response:

```
{
  "msg": "User updated successfully!"
}
```

#### Delete User

DELETE `/api/users/deleteuser/`

**Requires:** Authorization

Deletes an employee from the database. Only admins can access the users page.

Response includes a success message.

Response:

```
{
  "msg": "User deleted successfully"
}
```

#### Employee Logout

GET `/api/users/logout`

removes authorization token from local storage, prohibitting any access to pos system unless authorized credentials are entered.

### Item Routes

#### Add Item

POST `/api/products/addproducts`

**Requires:** Authorization

Adds a new food item to the database. Only admins can view products page.

Request body should look like this:

```
{
  "name": "Spring Rolls",
  "category": "Appetizers",
  "price": "4.50",
}
```


`name`: String, required, must be unique

`price`: Number, required

`category`: String, optional

Response includes the added item's:

- name
- category
- price

Response:

```
{
    "_id": "63d95b2fc9fa35bc2bb12841",
    "name": "Spring Rolls",
    "category": "Appetizers",
    "price": 4.5,
    "modifier": [],
    "createdAt": "date item was created",
    "updatedAt": "date item was updated last",
    "__v": 0
},
  "msg": "Product Added Successfully!"
}
```

#### Get All Items

GET `/api/products/getproducts`

Retrieves all of the food items from the database.

Each element in the response array includes and item's:

- name
- category
- price

Response:

```
{
  "items": [
    {
    "_id": "63d95b2fc9fa35bc2bb12841",
    "name": "Spring Rolls",
    "category": "Appetizers",
    "price": 4.5,
    "modifier": [],
    "createdAt": "date item was created",
    "updatedAt": "date item was updated last",
    "__v": 0
    },
    {
    "_id": "63d95c51c9fa35bc2bb1284c",
    "name": "Fries",
    "category": "Appetizers",
    "price": 3.5,
    "modifier": [],
    "createdAt": "date item was created",
    "updatedAt": "date item was updated last",
    "__v": 0
    },
	.....
  ]
}
```

#### Update Item

PUT `/api/products/updateproducts`

**Requires:** Authorization

Updates information for an existing food item. Only admins can view products page.

Modal will open up with all of products information and will overwrite product with any changed information.

pre updated item
```
{
    "_id": "63d95c51c9fa35bc2bb1284c",
    "name": "Fries",
    "category": "Appetizers",
    "price": 3.5,
    "modifier": [],
    "createdAt": "date item was created",
    "updatedAt": "date item was updated last",
    "__v": 0
}
```
inputting new item detail (price in this case)
```
{
    "_id": "63d95c51c9fa35bc2bb1284c",
    "name": "Fries",
    "category": "Appetizers",
    "price": 4.5,
    "modifier": [],
    "createdAt": "date item was created",
    "updatedAt": "date item was updated last",
    "__v": 0
}
```

`name`: String

`price`: Number

`category`: String

You only need one field!

Response includes the updated item's:

- name
- price
- category

Response:

```
{
    "_id": "63d95c51c9fa35bc2bb1284c",
    "name": "Fries",
    "category": "Appetizers",
    "price": 4.5,
    "modifier": [],
    "createdAt": "date item was created",
    "updatedAt": "date item was updated last",
    "__v": 0
}
```

#### Delete Item

DELETE `/api/products/deleteproducts/`

**Requires:** Authorization

Deletes an item from the database. Only admins can view the products page.

Response includes a success message and the deleted item's:

- name
- price
- category
- description

Response:

```
{
    "_id": "63d95c51c9fa35bc2bb1284c",
    "name": "Fries",
    "category": "Appetizers",
    "price": 3.5,
    "modifier": [],
    "createdAt": "date item was created",
    "updatedAt": "date item was updated last",
    "__v": 0
}
  },
  "msg": "Product Deleted Successfully!"
}
```

### Table Routes

#### Add Table

POST `/api/tables/addtables`

**Requires:** Authorization

Adds a new table to the database

Request body should look like this:

```
{
  "tableNum": "A11"
}
```

`number`: Number, required

Response includes the added item's:

- Table number

Response:

```
  "tables": [
    {
      "_id": "5ba6c6860c6f7f7f7e859dc6",
      "tableNum": 1,
      "__v": 0
	  "createdAt": "date item was created",
	  "updatedAt": "date item was updated last",  
    }
  ],
  "msg": "Table added successfully
```

#### Get All Tables

GET`/api/tables/gettables`

**Requires:** Authorization

Get all tables.

Response:

```
{
  "tables": {
    "id": "5ba6c19f0c6f7f7f7e859dc4",
    "number": 1,
    "__v": 0
	"createdAt": "date item was created",
    "updatedAt": "date item was updated last",
  },
  {
    "id": "5ba6d19f0c6f7f7f7e859db4",
    "number": 1,
    "__v": 0
	"createdAt": "date item was created",
    "updatedAt": "date item was updated last",
  },
  ...
}
```

#### Update Tables

POST `api/tables/update`

**Requires:** Authorization

Updates all the tables in array in the request body.

Request body should look like this:

```

{
	"_id": "5bb91ad8d5461a87502efc83",	
	"tableNum": "A11"
	"__v": 0
	"createdAt": "date item was created",
	"updatedAt": "date item was updated last",
}
```

`tables`: Array of Objects with Table information

Response includes the added item's:

Response:

```
{
	"_id": "5bb91ad8d5461a87502efc83",
	"tableNum": A11,
	"__v": 0
	"createdAt": "date item was created",
	"updatedAt": "date item was updated last",

}
```

#### Delete Table

Delete `api/tables/deletetables`

**Requires:** Authorization

Deletes a table by its ID. The ID will be pulled off of the request parameters. No request body is required for this route. Only admins can view tables page.

Response:

```
{
  "tables": [
    {
      "_id": "5ba6c6860c6f7f7f7e859dc6",
      "tableNum": 1,
      "__v": 0
	  "createdAt": "date item was created",
	  "updatedAt": "date item was updated last",  
    }
  ],
  "msg": "Table deleted successfully
```

### Bill Routes

#### Add Bill

POST `api/bills/addbills`

Adds a new bill to the database

Request body should look like this:

```
{
	"_id": "5bb91ad8d5461a87502efc83",	
	"" : "12",
	"cartItems" : [...],
	"__v": 0
	"createdAt": "date item was created",
	"updatedAt": "date item was updated last",
}
```


`bills`: Array of Objects with items in bill.

Response includes the added items as an Array labelled cartItems:

Response:

```
{
"_id": "63d95f62c9fa35bc2bb12886"
"tableNumber" : "12"
"subTotal" : "77"
"totalAmount" : "87.01"
"tax" : "10.01"
"paymentMethod" : "cash"
"cartItems" : [],
"createdAt" : "2023-01-31T18:35:14.220+00:00"
"updatedAt" : "2023-01-31T18:35:14.220+00:00"
__v : 0
},
msg: "Bill Created Successfully
```

#### Get Bills

get `api/bills/getbills`


Response:

```
{
_id: 63d95f62c9fa35bc2bb12886
tableNumber : "12"
subTotal : 77
totalAmount : 87.01
tax : 10.01
paymentMethod : "cash"
cartItems: Array
createdAt : 2023-01-31T18:35:14.220+00:00
updatedAt : 2023-01-31T18:35:14.220+00:00
__v : 0
},
...

```
