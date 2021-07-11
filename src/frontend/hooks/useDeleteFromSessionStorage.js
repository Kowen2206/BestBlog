
const useDeleteFromSessionStorage = () => {
    console.log("remove articles")
    const removeArticle = () =>{
        window.sessionStorage.removeItem("articleContent");
        window.sessionStorage.removeItem("articleTitle");
        window.sessionStorage.removeItem("articleImage");
    }

    return removeArticle
}

export default useDeleteFromSessionStorage;
