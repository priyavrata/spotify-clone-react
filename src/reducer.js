export const initialState = {
    user: null,
    playlists: [],
    spotify: null,
    discover_weekly: null,
    top_artists: null,
    playing: false,
    item: null,
    // token: "BQAkx3ermdGgsW1ePk_yFbKa00_ycyGcthLmHmg3E00OZFU_ora5GqLDKU1mWWFJKE7RVTgdq5hp-gLzQB24C5HXu5Vockkmn4VtAKMW5PuHO40EaNNo4v-Q3NwzbqVDbnE6alWhAh986GXGgHjl097eJUr84KQRZ9iRi5jk7UIrroV_"
  };

const reducer = (state, action) =>{
    console.log(action);
    switch(action.type){
        case "SET_USER":
        return {
            ...state,
            user: action.user,
        };

        case "SET_PLAYING":
        return {
            ...state,
            playing: action.playing,
        };

        case "SET_ITEM":
        return {
            ...state,
            item: action.item,
        };

        case "SET_DISCOVER_WEEKLY":
        return {
            ...state,
            discover_weekly: action.discover_weekly,
        };

        case "SET_TOP_ARTISTS":
        return {
            ...state,
            top_artists: action.top_artists,
        };

        case "SET_TOKEN":
        return {
            ...state,
            token: action.token,
        };

        case "SET_SPOTIFY":
        return {
            ...state,
            spotify: action.spotify,
        };

        case "SET_PLAYLISTS":
        return {
            ...state,
            playlists: action.playlists,
        };
        default:
            return state;
    }
};

export default reducer;