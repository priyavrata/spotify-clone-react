export const initialState = {
    user:null,
    playlists: [],
    playing: false,
};

const reducer = (state, action) =>{
    console.log(action);
    switch(action.type){
        case 'SET_USER':
            return{
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
};

export default reducer;