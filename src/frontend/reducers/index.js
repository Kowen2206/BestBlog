const reducer = (state, action)=>{
    switch(action.type){
        case "saveArticle": 
        return{
            ...state,
            user:[{...action.payload, session: true}],

        };
        default:
            return state;
    }
}
  
export default reducer;