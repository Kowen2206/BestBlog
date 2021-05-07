export default reducer;

export const saveArticle = payload =>{
    return { 
      type: "saveArticle",
      payload
      }
}