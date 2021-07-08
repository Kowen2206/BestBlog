import React from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { createArticle, showWindowError } from '../actions';
import '../assets/styles/Moleculas/Editor.scss';
import '../assets/styles/Atomos/UploadImageButton.scss';
import HeaderImageEditor from '../components/HeaderImageEditor';
import CkEditor from '../components/CkEditor';
import useGetDate from '../hooks/useGetDate';
import { useParams } from 'react-router-dom';

const Editor = (props) => {

  const {id} = useParams();

  const [articleError, setarticleError] = React.useState(false);

  const {UserName, UserPhoto, UserId, showWindowError} = props
  const getDate = useGetDate();

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
      handleCreateArticle({Title, ArticlePhoto, ArticleContent, Preview})
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
      props.createArticle(articleSchema)
  }

  return (
    <>
      <Header />
      <div className="editor__container">
        <HeaderImageEditor />
        <CkEditor articleId={id} />
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
  showWindowError
}

const mapStateToProps = state => {
  return {
      UserName: state.user.name,
      UserPhoto: state.user.photo,
      UserId: state.user.id
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);