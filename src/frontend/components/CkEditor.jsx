import React, {useRef, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { loadArticle } from '../actions';
import { injectArticle } from '../actions';

const ckEditor = ({articleId, articleView, loadArticle, injectArticle}) => {

    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, ClassicEditor } = editorRef.current || {};
    let save = false;
    const [text, setText] = useState("");
    
    let textOfArticleToEdit = articleView.ArticleContent || "Cargando...";
    

    useEffect(() => {
        let savedText;
        if(window.sessionStorage.getItem("articleContent")){
            savedText = window.sessionStorage.getItem("articleContent");
        }else if(articleId){
            loadArticle(articleId)
            savedText = textOfArticleToEdit;
        }else{
            savedText = "<p>Escribe tu articulo aquí!</p>"
        }
        setText(savedText);
        console.log(savedText)
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        }
        setEditorLoaded(true);
        console.log("Ejecutando EFFECT DEL EDITOR")
        return () => injectArticle([]);
    }, [textOfArticleToEdit]);

    const handleEditorData = (data) =>{
        window.sessionStorage.setItem("articleContent", data);
    }

    return (
        <>
            <label htmlFor="Title">Escribe un titulo</label> <br/>
            <input onChange={ (title) => window.sessionStorage.setItem("articleTitle", title.target.value) } className="Editorcontainer_item inputTitle" name="Title" id="Title"/>
            <div >
                <div className="Editorcontainer_item">
                    { 
                        editorLoaded ? 
                            <CKEditor 
                                editor={ClassicEditor} 
                                data= {text}
                                onReady={editor => { 
                                    // You can store the "editor" and use when it is needed. 
                                    console.log('Editor is ready to use!', editor); 
                                }} 
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    handleEditorData(data);
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                                config={{
                                    ckfinder: {
                                        uploadUrl: 'https://the-bestblog.herokuapp.com/uploadCkeditorImage',
                                        removePlugins: ['Heading', 'MediaEmbed'],
                                    }
                                }}
                            /> : <div> Cargando... </div>
                    }
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        articleView: state.articleView
    }
}

const mapDispatchToProps = {
    loadArticle,
    injectArticle
}

export default connect(mapStateToProps, mapDispatchToProps)(ckEditor);