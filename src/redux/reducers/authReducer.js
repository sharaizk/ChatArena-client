import { SIGN_UP, LOG_IN, LOG_OUT,FRIENDS } from "../types";
const INITIAL_STATE = {
  isSignedIn: false,
  userId: null,
  name: null,
  email: null,
  username: null,
  dateofbirth: null,
  gender: null,
  country: null,
  friends: [],
  profilepic: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP:
      return { ...state };
    case LOG_IN:
      const {
        _id,
        name,
        email,
        username,
        dateofbirth,
        country,
        gender,
        friends,
        profilepic
      } = action.payload;
      return {
        ...state,
        isSignedIn: true,
        userId: _id,
        name: name,
        email: email,
        username: username,
        dateofbirth: dateofbirth,
        country: country,
        gender: gender,
        friends: friends,
        profilepic:profilepic
      };
    case LOG_OUT:
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        name: null,
        email: null,
        username: null,
        dateofbirth: null,
        gender: null,
        country: null,
        friends: [],
        profilepic:null
      };
    case FRIENDS:
      return{
        ...state,
        friends: action.payload
      }
    default:
      return { ...state };
  }
};

export default authReducer;
