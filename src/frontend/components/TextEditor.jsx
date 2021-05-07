import React, {useState, useEffect, useRef} from 'react'


const TextEditor = () =>{
    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, ClassicEditor } = editorRef.current || {}

    useEffect(() => {
        editorRef.current = {
          CKEditor: require( '@ckeditor/ckeditor5-react' ).CKEditor,
          ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        }
        setEditorLoaded(true);
    }, []);

    return(
        <div className="editor__container">
         <div>
                <h2>Write something new</h2>
                {
                    editorLoaded?
                    <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Start writting here</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                /> : <div> Cargando... </div>
                }
            </div>

            <button>Guardar</button>
    </div>  
    );
}

export default TextEditor;