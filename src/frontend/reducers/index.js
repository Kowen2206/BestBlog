const reducer = (state, action)=>{
    switch(action.type){
        case "saveTemporalArticle": 
        return{
            ...state,
            pending_article:[action.payload],
        };
        case "sigIn":
            return{
                ...state,
                user:[{...action.payload, session: true}]
            };
        case "LogOut": 
        return{
            ...state,
            user:[{}],
            
        };
        case "injectArticle":
            return{
                ...state,
                articleView: action.payload
            }
        case "deleteArticle":
                const newArticlesArray = state.articles.filter(item => item._id !== action.payload);
                return{
                    ...state,
                    articles:  newArticlesArray
                }
        case "showWindowMessage":
                return{
                    ...state,
                    Message:  {...action.payload}
                }
        default:
            return state;
    }
}
  
export default reducer;