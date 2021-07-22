
const useDeleteFromLocalStorage = () => {
    console.log("remove articles")
    const removeArticle = () =>{
        window.localStorage.removeItem("articleContent");
        window.localStorage.removeItem("articleTitle");
        window.localStorage.removeItem("articleImage");
    }

    return removeArticle
}

export default useDeleteFromLocalStorage;
