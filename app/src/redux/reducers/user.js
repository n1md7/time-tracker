const user = (state = {
  name: null,
  email: null,
  isAdmin: false
}, {type, ...rest}) => {
  switch (type) {
    case "UPDATE":
      return {
        ...state,
        ...rest
      };
    default:
      return state;
  }
}

export default user;
