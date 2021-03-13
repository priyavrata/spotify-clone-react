export const initialState = {
    user:null,
    playlists: [],
    playing: false,
    // token:null,
    // token: "BQB7qJINh-Zqn7I2ECN9V0OrlRKvTxjK4wxt0er15hP5cohmNJ8D41l24ak51bEtDn_9uF13DUeL2cxx6sfNxu5IeWbwSyjnqIETP487Tx-xzhP_dXeP4N3ddmshBBf7XxsrZdj1pAXPI5UEnhP2vCF3QXDZeiUC5PQu7QYQBJHkQywi"
};

const reducer = (state, action) =>{
    console.log(action);
    switch(action.type){
        case 'SET_USER':
            return{
                ...state,
                user: action.user,
            };
        
        case "SET_TOKEN":
            return{
                ...state,
                token: action.token,
            }
        
        case "SET_PLAYLISTS":
            return{
                ...state,
                playlists:action.playlists
            }
        case "SET_DISCOVER_WEEKLY":
            return{
                ...state,
                discover_weekly:action.discover_weekly,
            }
        default:
            return state;
    }
};

export default reducer;