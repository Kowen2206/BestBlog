const reducer = (state, action)=>{
    switch(action.type){
        case "saveArticle": 
        return{
            ...state,
            pending_articles:[{...action.payload}],

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
        default:
            return state;
    }
}
  
export default reducer;