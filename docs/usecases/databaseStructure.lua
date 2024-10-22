Users (Collection)
|
|-- userID123 (Document)
|   |-- username: "JohnDoe"
|   |-- email: "johndoe@example.com"
|   |-- createdDate: "2023-10-01"
|   |
|   |-- Gardens (Subcollection)
|       |
|       |-- gardenID456 (Document)
|       |   |-- name: "Backyard Garden"
|       |   |-- location: "Outdoor, Johannesburg"
|       |   |-- createdDate: "2023-10-02"
|       |   |
|       |   |-- Plants (Subcollection)
|       |       |
|       |       |-- plantID789 (Document)
|       |       |   |-- plantName: "Rose"
|       |       |   |-- type: "Flower"
|       |       |   |-- lastWatered: "2023-10-10"
|       |       |   |-- healthStatus: "Healthy"
|       |
|       |-- gardenID987 (Document)
|           |-- name: "Vegetable Garden"
|           |-- location: "Outdoor, Johannesburg"
|           |-- createdDate: "2023-10-03"
|           |
|           |-- Plants (Subcollection)
|               |
|               |-- plantID654 (Document)
|               |   |-- plantName: "Tomato"
|               |   |-- type: "Vegetable"
|               |   |-- lastWatered: "2023-10-12"
|               |   |-- healthStatus: "Needs Water"
|
|-- userID456 (Document)
    |-- username: "JaneSmith"
    |-- email: "janesmith@example.com"
    |-- createdDate: "2023-09-30"
    |
    |-- Gardens (Subcollection)
        |
        |-- gardenID321 (Document)
            |-- name: "Indoor Plants"
            |-- location: "Indoor, Aalen"
            |-- createdDate: "2023-09-30"
            |
            |-- Plants (Subcollection)
                |
                |-- plantID111 (Document)
                    |-- plantName: "Cactus"
                    |-- type: "Succulent"
                    |-- lastWatered: "2023-10-11"
                    |-- healthStatus: "Healthy"
