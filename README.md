# DD5 Generator

![output (1)](https://github.com/user-attachments/assets/87af1121-07fb-4930-b787-66b3271c9211)

/!\ _This application is currently under development._

This application is a treasure generation tool for Dungeon and Dragon 5th edition.  
It sets up a nestJs server that generates treasures on port 3000 that is used and displayed by a frontend on port 4000.

Treasure generation is based on the following website: https://5e-drs.fr/les-tresors/ and on the **Dungeon master's Guide (FR version)**  
Name generation is using the following API: https://fantasyname.lukewh.com/help 

The file folder contains the generation tables used by the app (taken from the site and formatted)

## How to run

Follow these steps to set up and run the application locally.

### Prerequisites (tested on 19 November 2024)

- Node.js v23.2.0
- npm v10.9.0

### Run

The backend:  
- Go to `dd5-generator` directory (`cd .\dd5-generator\`)
- Install the dependencies : `npm install`
- Run the application `npm run start`
- Open `http://localhost:3000/`

The frontend:  
- Go to `dd5-generator-front` directory (`cd .\dd5-generator-front\`)
- Install the dependencies : `npm install`
- Run the application `npm start`
- Open `http://localhost:4000/`

### Documentation

Go to `http://localhost:3000/docs` to consult swagger documentation _(available in the frontend in docs part)_

![alt text](image-1.png)

### Next steps
- Add Special feature of a magical object (standard one)
- Add name generator part

## Screenshots
![alt text](image.png)
![alt text](image-2.png)


