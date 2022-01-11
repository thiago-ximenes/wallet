export const SET_EMAIL = 'SET_EMAIL';
const INITIAL_STATE = {
  email: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}
