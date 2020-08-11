const loadingReducer = (state = { progressbarOpen: false }, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        progressbarOpen: true,
      };
    case 'NOT_LOADING':
      return {
        ...state,
        progressbarOpen: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;
