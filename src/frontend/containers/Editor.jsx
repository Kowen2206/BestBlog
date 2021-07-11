import React from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { createArticle, showWindowError, loadArticle, updateArticle, injectArticle} from '../actions';
import '../assets/styles/Moleculas/Editor.scss';
import '../assets/styles/Atomos/UploadImageButton.scss';
import HeaderImageEditor from '../components/HeaderImageEditor';
import CkEditor from '../components/CkEditor';
import useGetDate from '../hooks/useGetDate';
import { useParams } from 'react-router-dom';
import useDeleteFromSessionStorage from '../hooks/useDeleteFromSessionStorage';

//papillon
const Editor = (props) => {
  const {id} = useParams();
  const [articleError, setarticleError] = React.useState(false);
  const {UserName, UserPhoto, UserId, showWindowError, articleView, loadArticle, injectArticle, createArticle, updateArticle} = props
  const getDate = useGetDate();
  const removeArticle = useDeleteFromSessionStorage();

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
    setarticleError(true);
    showWindowError([true, errorMessage])
  }

  const handleSubmit = () =>{
      const ArticleContent = window.sessionStorage.getItem("articleContent") || null;
      const Title = window.sessionStorage.getItem("articleTitle") || null;
      const ArticlePhoto =  window.sessionStorage.getItem("articleImage") || null;
      const Preview = ArticleContent != null? getSumary(ArticleContent) : null;

      ArticleContent == null? handleError("El contenido del articulo no puede estar vació") : 
      Title == null? handleError("debes agregar un titulo")  :
      ArticlePhoto == null? handleError("debes seleccionar una foto") :
      Preview == null? handleError("El contenido del articulo es demasiado corto")  : null;
      console.log(Title, ArticlePhoto, ArticleContent, Preview);

      if(!articleError){
        console.log("Title, ArticlePhoto, ArticleContent, Preview");
        console.log(Title, ArticlePhoto, ArticleContent, Preview);
        id === "Nuevo"? handleCreateArticle({Title, ArticlePhoto, ArticleContent, Preview}) :
        handleUpdateArticle({Title, ArticlePhoto, ArticleContent, Preview})
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
  showWindowError,
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