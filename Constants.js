import { Dimensions } from 'react-native';

//for now this is only valid if you cant rotate the screen
const windowHeight = Math.round(Dimensions.get("window").height)
const windowWidth = Math.round(Dimensions.get("window").height)

export {
    windowHeight,
    windowWidth
}