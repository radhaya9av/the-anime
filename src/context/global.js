import React, {createContext, useContext, useReducer} from "react";

const GlobalContext = createContext();

//actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_PICTURES = "GET_PICTURES";

//reducer
const reducer = (state, action) => {
    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case GET_POPULAR_ANIME:
            return {...state, popularAnime: action.payload, loading: false}
        case SEARCH:
            return {...state, searchResults: action.payload, loading: false}
        case GET_UPCOMING_ANIME:
            return {...state, upcomingAnime: action.payload, loading: false}
        case GET_AIRING_ANIME:
            return {...state, airingAnime: action.payload, loading: false}
        case GET_PICTURES:
            return {...state, pictures: action.payload, loading: false}
        default:
            return state;
    }
}


export const GlobalContextProvider = ({children}) => {
    //intial state
    const intialState = {
        popularAnime: [],
        upcomingAnime: [],
        airingAnime: [],
        pictures: [],
        isSearch: false,
        searchResults: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(reducer, intialState);
    const [search, setSearch] = React.useState('');


    //handle change
    const handleChange = (e) => {
        setSearch(e.target.value);
        if(e.target.value === ''){
            state.isSearch = false;
        }
    }

    //initial render
    React.useEffect(() => {
        getPopularAnime();
    }, [])

    return(
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            searchAnime,
            search,
            getPopularAnime,
            getUpcomingAnime,
            getAiringAnime,
            getAnimePictures 
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}