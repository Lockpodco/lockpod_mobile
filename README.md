# lockpod_mobile

### **GLOBAL STORE**

Global store is a built in react-native way of storing, passing, and updatng data throughout the app. Instead of passing stateObjects like a `userProfile` to each Screen / component individually, you can store one copy of it, and then observe changes within the individual Screens that need access to it.

To update the object, you call a dispatch function with the type of update you are making along with the associated payload.

### **Example: Reading UserProfile**

(This will only work once the user is authenticated)

in the file you want to access the userProfile through, import the useProfileContext hook from the `UserProfileContext.tsx` file. Also import the `UpdateUserProfileActionType` and `UserProfile`. The `UpdateUserProfileActionType` is the type of action you run on the dispatch, and the `UserProfile` is the schema for the UserProfile

` import { useUserProfileContext, UpdateUserProfileActionType, UserProfile } from <path to UserProfileContext>";`

at the top of the component you want to use the userProfile, use the `useProfileContext` hook. This is basically a glorified useReducer() method that specifically connects to the userProfile context.

`const { userProfile, profileDispatch } = useUserProfileContext();`

to access specific properties of the userProfile, invoke it using dot notation. This is a class and you can simply access properties / methods as you would any other class.

`const user_id = userProfile.user_id;`

To update the userProfile

1. make a copy of the current userProfile
2. perform any modifications to the copy
3. use the `profileDispatch` function to update the context and the database.

```
profileDispatch( {
    type: UpdateUserProfileActionType.loadProfile,
    updatedProfile: newProfile
} );
```

### **INSTALLATION**

#### **Cloning**

[lockpod_mobile](https://github.com/Lockpodco/lockpod_mobile) (this repo)

[lockpod_backend](https://github.com/Lockpodco/lockpod_backend)

#### **Environment**

create a file named `.env` in the root directory of the backend repo. In it, configure the `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_DATABSE`, `DATABASE_PORT`, `DATABASE_HOST` variables given to you by an admin.

#### **Node.js packages**

Have either the [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) package manager

run `npm install` in the root directory.

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
