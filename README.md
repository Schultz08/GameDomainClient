# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

About the Game.
-------------------------------------
GameDomain is an app where you can play react/js games and compete for the high score.


Setup.
-------------------------------------
To get started you will need to clone this repo and the server side located at https://github.com/Schultz08/GameDomainServer

Server Side Setup
-------------------------------------
Once cloned from https://github.com/Schultz08/GameDomainServer, for the server side you will need to set up your .env with your DATABASE_URL, PORT, and JWT_SECRET inside the server's server folder.
right click the server folder then click open intergrated terminal inside the terminal run a npm install. If you have issues with node_moduels give a npm update a try.

The server should be good to go.

Client Side Setup
------------------------------------
You will needd to go to GameDomainClient > src > helpers > enviroment.js and change the localhost
information to your localhost information. Right click the GameDomainClient folder then click open intergrated terminal.
Inside the terminal run a npm install. If you have issues with node_moduels give a npm update a try.


Features
-----------------------------------
As of 01/13/2020 you will need to log in to access all features.
You can Sign up/Log in. 
Go to the Game Library to play games,
Check a Leaderboard,
A mail system with the functionality to reply to other's who message you.
Admin portal - Admin port is password protected. password can be found in the Admin component.
On the Side Nav bar you can Switch your Theme! (working on the color pallets still)
