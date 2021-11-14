
const useDeleteFromLocalStorage = () => {
    const removeArticle = () =>{
        window.localStorage.removeItem("articleContent");
        window.localStorage.removeItem("articleTitle");
        window.localStorage.removeItem("articleImage");
    }

    return removeArticle
}

export default useDeleteFromLocalStorage;
