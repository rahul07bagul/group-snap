export const initialState = {
  user: null, // Initial state for user
  profilePicture: null, // Add profilePicture to the initial state
  allPosts: null,
  groupPosts: {},
  error: null, // Add error state
};

export const actionTypes = {
  SET_USER: 'SET_USER', 
  SET_ALL_POSTS: 'SET_ALL_POSTS', 
  SET_GROUP_POSTS: 'SET_GROUP_POSTS', 
  SET_PROFILE_IMAGE: 'SET_PROFILE_IMAGE',
  SET_PROFILE_ERROR: 'SET_PROFILE_ERROR',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user, // Update user in the global state
      };

    case actionTypes.SET_ALL_POSTS:
      return {
        ...state,
        allPosts: action.allPosts, // Update posts in the global state
      };

      case actionTypes.SET_GROUP_POSTS:
        return {
          ...state,
          groupPosts: {
            ...state.groupPosts,
            [action.groupId]: action.posts, // Store posts for a specific group
          },
        };

    case actionTypes.SET_PROFILE_IMAGE:
      return {
        ...state,
        profilePicture: action.profilePicture, // Store profile picture in global state
      };

    case actionTypes.SET_PROFILE_ERROR:
      return {
        ...state,
        error: action.error, // Set error state
        loadingProfilePicture: false,
      };

    default:
      return state;
  }
};

export default reducer;
