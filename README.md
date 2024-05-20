# lockpod_mobile

### **CODE STYLE**

**backend**

- for simple posts / get requests, try to use params as much as you can
  `ie. localhost/reservations/cancel?reservationId=5`

- try to create reusable, multi-purpose backend calls. Include additional params that may be useful in other tasks, not jus the one you're implementing

**frontend**

- Object models represent database tables in frontend typescript code
- Service calls connect frontend calls to backend queries
- Global stores / context provide instances of specific values from the database, updated, across the app
- everything else is front end UI

- [//MARK your code.](https://marketplace.visualstudio.com/items?itemName=spywhere.mark-jump)

**UI**

- <ins>avoid putting any logic in the frontend. The front end should only run service calls that are implemented elsewhere</ins>
- <ins>Provide as much information as you can when creating initial views. Even if it is ugly / hard to read, it makes determining what is going on in the backend much easier!</ins>
- make every view in the view heirarchy its own its component. Avoid having react return statements that are hundreds of lines long; break up the collection view into smaller components, and define those earlier in the file

```
const LockPodPreview = ({
    lockpod,
    index,
  }: {
    lockpod: LockPod;
    index: number;
  }) => {
    function selectLockpod() {
      setSelectedLockpod(lockpod);
      setSelectedLockpodIndex(index);
    }

    const localStyles = StyleSheet.create({
      container: {
        ...
      },
    });

    const icon =
      lockpod.isReserved || lockpod.inSession
        ? images.lockpodPreviews.unavailable
        : images.lockpodPreviews.available;

    return (
      <Pressable style={localStyles.container} onPress={() => selectLockpod()}>
        <Image source={icon} style={styles.picture} />
        <Text>{lockpod.name}</Text>
      </Pressable>
    );
  };
```

- avoid using redundant state variables. When thinking about creating a new state variable, consider if any of the other state vars can be transformed to give you the information you need
- Define everythign in consts before using in the UI

- avoid long + logic filled useEffects(). Writing a fetch call is good, but much more than that is bad
- categorize your code into variables, methods, styles, body

---

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
