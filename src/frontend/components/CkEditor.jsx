import React, {useRef, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { loadArticle } from '../actions';

const ckEditor = ({articleContent, articleTitle}) => {

    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, ClassicEditor } = editorRef.current || {};
    const [title, setTitle] = useState(false)
    let save = false;
    const [text, setText] = useState("");
    let textOfArticleToEdit = articleContent;

    useEffect(() => {
        let savedText;
        if(window.sessionStorage.getItem("articleContent") && articleContent === ""){
            savedText = window.sessionStorage.getItem("articleContent");
        }else{
            savedText = "<p>Escribe tu articulo aquí!</p>"
        }

        articleTitle !== ""? window.sessionStorage.setItem("articleTitle", articleTitle) : null
        setText(savedText);
        console.log(savedText)
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        }
        setEditorLoaded(true);
    }, [articleTitle]);

    const handleEditorData = (data) =>{
        window.sessionStorage.setItem("articleContent", data);
    }

    return (
        <>
            <label htmlFor="Title">Escribe un titulo</label> <br/>
            <input onChange={ (newtitle) =>  {
                setTitle(newtitle.target.value);
                window.sessionStorage.setItem("articleTitle", newtitle.target.value)
            }}
             className="Editorcontainer_item inputTitle" name="Title" id="Title" value={!title? articleTitle : title}/>
            <div >
                <div className="Editorcontainer_item">
                    { 
                        editorLoaded ? 
                            <CKEditor 
                                editor={ClassicEditor} 
                                data= {textOfArticleToEdit !== ""? textOfArticleToEdit : text}
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

const mapDispatchToProps = {
    loadArticle
}

export default connect(null, mapDispatchToProps)(ckEditor);