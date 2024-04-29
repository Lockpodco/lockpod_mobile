# lockpod_mobile

### **INSTALLATION**

#### **Cloning**

[lockpod_mobile](https://github.com/Lockpodco/lockpod_mobile) (this repo)

[lockpod_backend](https://github.com/Lockpodco/lockpod_backend)

#### **Environment**

create a file named `.env` in the root directory of the backend repo. In it, paste in the following code

`DATABASE_URL=postgresql://lockpods:LockYourBike@lockpod-db.cl6ui2s2cuk7.us-west-1.rds.amazonaws.com:5434/app_data`

when working on the mobile front_end, you will need an instance of the backend running.

#### **Node.js packages**

Have either the [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) package manager

you will need the following packages

- `npm install expo `
- `npm install react`
- `npm install react-native`

### **RUNNING**

#### **From the Terminal**

in the directory of the backend, start the backend:

- `npm start`

> if it gives an error while starting, you may be missing a package dependency. Use `npm install <package>` and rereun to fix this issue.

> use `^C` to exit and turn off the locak backend

Once the backend is running, in the directory of the frontend, start the mobile application

- `npm start`

then use commands to start device simulators, refresh the app, or restart the expo server.

> if it gives an error while starting, you may be missing a package dependency. Use `npm install <package>` and rereun to fix this issue.

> if there is an error once the app boots up, ensure you have the .env file in the right palce, and with the right contents

> if the issue persists, check you are the most recent commit from the github repo.

#### **From GUI Application**

start the backend from the pgAdmin dashboard.

To check the backend is running, use [postman](https://web.postman.co/workspace/My-Workspace~e06a3dd2-cd19-4dbc-8670-dfa02a571206/request/create?requestId=e50bbb7f-12fa-4771-865c-81dcfad44b3c) to submit a `GET` request:

`http://localhost:3000/lockpods`

For further assistance on running the backend from the GUI application, check the [setup docs](https://docs.google.com/document/d/1p3ZJFpEFAl-a8mAdTrjhQ3hbEYJSQLrv5l4eS-d9EvQ/edit)
