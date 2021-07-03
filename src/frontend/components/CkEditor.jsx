import React, {useRef, useEffect, useState} from 'react';

const ckEditor = () => {

    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, ClassicEditor } = editorRef.current || {};
    let save = false;
    const [text, setText] = useState("");

    

    useEffect(() => {
        let savedText;
        savedText = window.sessionStorage.getItem("articleContent")? window.sessionStorage.getItem("articleContent") : "<p>Start writting here</p>"
        setText(savedText);
        console.log(savedText)
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        }
        setEditorLoaded(true);
    }, []);

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
                                        uploadUrl: 'http://localhost:2000/uploadCkeditorImage',
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

export default ckEditor
