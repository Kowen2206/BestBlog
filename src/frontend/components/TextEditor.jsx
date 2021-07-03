import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { createArticle } from '../actions';
import HeaderImage from '../components/HeaderImage';
import useGetDate from '../hooks/useGetDate';
import HeaderImageEditor from './HeaderImageEditor';

//Agregar validación para tamaño de titulo maximo de 39 caracteres 

const TextEditor = (props) => {

   /* const [articleData, articleDataState] =
    useState({
        Title: "undefined", ArticleContent: "", Preview: "",
            UserName: props.UserName, Date: "", ArticlePhoto: "", UserPhoto: ""
        }); */

    const getDate = useGetDate();

    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        }
        setEditorLoaded(true);
    }, []);

    return (
        <>
            
            <div className="editor__container">
                <div className="editor__container Editorcontainer_item">

                    <HeaderImageEditor articleData={articleData} articleDataState={articleDataState} />

                    <label htmlFor="Title">Escribe un titulo</label>
                    <input className="Editorcontainer_item inputTitle" name="Title" id="Title" onChange={data => {
                        setimageWordsColorState("blue");
                        { articleDataState({ ...articleData, Title: data.target.value }) }
                    }
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

                                config={{
                                    ckfinder: {
                                        uploadUrl: 'http://localhost:2000/uploadCkeditorImage',
                                        removePlugins: ['Heading', 'MediaEmbed'],

                                    }
                                }}

                            /> : <div> Cargando... </div>
                    }

                </div>

                <button onClick={() => {

                    let date = getDate();

                    props.createArticle({
                        ...articleData,
                        Preview: articleData.ArticleContent.length <= 170 ?
                            articleData.ArticleContent :
                            articleData.ArticleContent.substring(0, 170),
                        ArticlePhoto: articleData.ArticlePhoto,
                        UserName: props.UserName,
                        UserPhoto: props.UserPhoto,
                        Date: date,
                        UserId: props.userId
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

const mapStateToProps = state => {
    //UserPhoto: state.user.UserPhoto
    return {
        UserName: state.user.name,
        UserPhoto: state.user.photo,
        userId: state.user.id
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);

//Lista de funciones que debe cumplir el componente Editor:
/*

    El componente debera extraer con un setState los cambios del documento (tal como lo hace ahora).
    Posibles opciones de guardado automatico del artículo:
    1-Al cambiar de sección, antes de cambiar de sección el articulo ejecutara un dispatch que guardara en el estado, la foto, titulo, y contenido del documento.
    2-Al cambiar de sección, antes de cambiar de sección el articulo ejecutara un dispatch que guardara en el estado, la foto, titulo, y contenido del documento.
    3-Al recibir cualquier cambio el documento ejecutara un dispatch que se encargara de guardar en estado la foto, titulo, y contenido del documento.
    4-Al recibir cualquier cambio el documento ejecutara un dispatch que se encargara de guardar en el localStorage la foto, titulo, y contenido del documento.
    MEJOR OPCIÓN DE MOMENTO:
    5-Se generara un autoGuardado cada cierto tiempo en el localStorage del artículo en el cual se encuentre trabajando el usuario, para restaurarlo en caso de que por cualquier motivo el usuario
      deje pendiente la edición del archivo.
      En caso de optar por esta opción, se tomara en cuenta la posibilidad de descartar el uso del set estate para guardar los continuos cambios del documento, esto ultimo se sutituiria 
      posiblemente por el uso de un string, una función o un array almacenaría la información sin el uso de setState(Para mejorar la optimización).

*/

