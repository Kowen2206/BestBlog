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
                console.log("delete article");
                const newArticlesArray = state.articles.filter(item => item._id !== action.payload);
                return{
                    ...state,
                    articles:  newArticlesArray
                }
        case "showWindowError":
                console.log("ShowWindowError");
                return{
                    ...state,
                    Error:  [action.payload[0], action.payload[1]]
                }
        default:
            return state;
    }
}
  
export default reducer;