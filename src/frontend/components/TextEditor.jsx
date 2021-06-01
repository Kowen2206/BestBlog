import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { createArticle } from '../actions';
import HeaderImage from '../components/HeaderImage';

//Agregar validación para tamaño de titulo maximo de 39 caracteres 

const TextEditor = (props) => {

    const [imageWordsColor, setimageWordsColorState] = useState("red");
    const [saveButton, saveButtonState] = useState(false);
    const [articleData, articleDataState] = useState({ Title: "undefined", ArticleContent: "", Preview: "", 
    UserName: props.UserName, Date: "", ArticlePhoto: "", tags: "", UserPhoto: "" });

    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    const [HeaderArticleImage, HeaderArticleImageState] = useState("");

    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        }
        setEditorLoaded(true);
    }, []);

    const handlePublicArticle = () => {
        saveButtonState(!saveButton);
    }

    const handleHeaderImage = (file) =>{
       const imageUrlPreview = URL.createObjectURL(file);
       HeaderArticleImageState(imageUrlPreview);
    }

    return (
        <>
        {HeaderArticleImage != "" &&  <HeaderImage Image={HeaderArticleImage} />}
        <div className="editor__container">
            
            <div className="editor__container Editorcontainer_item">
                    

                    <div className="Editorcontainer_item">Selecciona una imagen de portada para tu articulo</div>

                    <label className="Editorcontainer_item ImageButton" htmlFor="Image">{articleData.ArticlePhoto == ""?"Subir una imagen" : "Cambiar imagen"}</label>
                    <input className="InputFile Editorcontainer_item" onChange={data => {
                            articleDataState({ ...articleData, ArticlePhoto: data.target.files[0]})
                            handleHeaderImage(data.target.files[0]);
                        }
                    } 
                    type="file" id="Image" name="Image" />

                    <div className="Editorcontainer_item" > {articleData.ArticlePhoto == ""? "Debes Seleccionar una imagen" : articleData.ArticlePhoto.name }</div>
            
                    <label  htmlFor="Title">Escribe un titulo</label>
                    <input className="Editorcontainer_item" name="Title" id="Title" onChange={data => {
                        setimageWordsColorState("blue");
                        { articleDataState({ ...articleData, Title: data.target.value }) }}
                        } />
                    
                
                {
                    editorLoaded ?
                        <CKEditor
                            editor={ClassicEditor}
                            data="<p>Start writting here</p>"
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                articleDataState({ ...articleData, ArticleContent: data });
                                console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}

                            config={{ckfinder: {
                                // Upload the images to the server using the CKFinder QuickUpload command
                                // You have to change this address to your server that has the ckfinder php connector

                                uploadUrl: 'http://localhost:2000/uploadCkeditorImage'
                            }}}

                        /> : <div> Cargando... </div>
                }

            </div>

            <button onClick={() => {
                       props.createArticle({
                            ...articleData,
                            Preview: articleData.ArticleContent.length <= 170 ?
                            articleData.ArticleContent :
                            articleData.ArticleContent.substring(0, 170),
                            ArticlePhoto: articleData.ArticlePhoto,
                            UserName: props.UserName,
                            UserPhoto: props.UserPhoto,
                            Date: "21/05/12"
                        }, articleData.ArticlePhoto); 

                    }}>Guardar</button>
           
        </div>
    </>
    );
}
//articleDataState({...articleData, ArticlePhoto: data}) createArticle 
const mapDispatchToProps = {
    createArticle
}

const mapStateToProps = state =>{
    //UserPhoto: state.user.UserPhoto
    return{
        UserName: state.user.name,
        UserPhoto: state.user.photo
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);