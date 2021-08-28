import React from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { createArticle, showWindowMessage, loadArticle, updateArticle, injectArticle} from '../actions';
import '../assets/styles/Moleculas/Editor.scss';
import '../assets/styles/Atomos/UploadImageButton.scss';
import HeaderImageEditor from '../components/HeaderImageEditor';
import CkEditor from '../components/CkEditor';
import useGetDate from '../hooks/useGetDate';
import { useParams } from 'react-router-dom';
import useDeleteFromLocalStorage from '../hooks/useDeleteFromLocalStorage';

const Editor = (props) => {
  const {id} = useParams();
  let articleError = false;
  const {UserName, UserPhoto, UserId, showWindowMessage, articleView, loadArticle, injectArticle, createArticle, updateArticle} = props
  const getDate = useGetDate();
  const removeArticle = useDeleteFromLocalStorage();

  React.useEffect(() => {
    console.log(id);
    if(id !== "Nuevo"){
      loadArticle(id)
    }

    return () =>{
      if(id !== "Nuevo") {
        removeArticle();
      }
      injectArticle([])
    }
  }, []);

  const getSumary = (articleContent) =>{
    if(articleContent.length <= 170) {
      return null
    } else {
      return articleContent.substring(0, 170)
    }
  }

  const handleError = (errorMessage) =>{
    articleError = true;
    showWindowMessage({message: errorMessage, title: "Error" });
  }

  const handleSubmit = () =>{
      const ArticleContent = window.localStorage.getItem("articleContent") || null;
      const Title = window.localStorage.getItem("articleTitle") || null;
      const ArticlePhoto =  window.localStorage.getItem("articleImage") || null;
      const Preview = ArticleContent != null? getSumary(ArticleContent) : null;

      ArticleContent == null? handleError("El contenido del articulo no puede estar vació") : 
      Title == null? handleError("debes agregar un titulo")  :
      ArticlePhoto == null? handleError("debes seleccionar una foto") :
      Preview == null? handleError("El contenido del articulo es demasiado corto")  : articleError = false;

      if(articleError === false){
        id === "Nuevo"? handleCreateArticle({Title, ArticlePhoto, ArticleContent, Preview}) :
        handleUpdateArticle({Title, ArticlePhoto, ArticleContent, Preview})
      }else{
      }
  }

  const handleCreateArticle = ({Title, ArticlePhoto, ArticleContent, Preview}) =>{
    const Date = getDate();

    const articleSchema = {
      Title,
      ArticleContent,
      Preview,
      UserName,
      Date,
      ArticlePhoto,
      UserPhoto,
      UserId
      }

      createArticle(articleSchema) 
  }

  const handleUpdateArticle = ({Title, ArticlePhoto, ArticleContent, Preview}) =>{
    const Date = getDate();
    
    const articleSchema = {
      Title,
      ArticleContent,
      Preview,
      UserName,
      Date,
      ArticlePhoto,
      UserPhoto
      }

      updateArticle({id, payload: articleSchema})

  }

  return (
    <>
      <Header/>
      <div className="editor__container">
        <HeaderImageEditor articlePhoto={articleView.ArticlePhoto || ""} />
        <CkEditor articleContent={articleView.ArticleContent || ""} articleTitle={articleView.Title || ""}  articleId={id} />
        <button onClick={() => {
          handleSubmit()
        }}>
          Guardar
        </button>
      </div>
    </>

  );
}

const mapDispatchToProps = {
  createArticle,
  showWindowMessage,
  loadArticle,
  injectArticle,
  updateArticle
}

const mapStateToProps = state => {
  return {
      UserName: state.user.name,
      UserPhoto: state.user.photo,
      UserId: state.user.id,
      articleView: state.articleView
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);