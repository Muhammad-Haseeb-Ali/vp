import { useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';

/**
 * # MY ACCOUNT GOOGLE PLAY:
 * @see {@link https://play.google.com/store/apps/developer?id=dzino Google Play}
 */

export default function PrivatePage(props) {
  const editorRef = useRef(null);

  const uploadToServer = async (event) => {
    event.preventDefault();
    const formData = document.getElementById("proposalForm"),
          body = new FormData(formData)

    // https://backofvp.up.railway.app
    // http://localhost
    
      fetch("https://backofvp.up.railway.app/proposal/" + body.get('id'), {
      method: "POST",
      mode: 'no-cors',
      body
    })  

  };

  // return (
  //   <div>
  //     <form id="proposalForm">
  //       <h4>Create Proposal</h4>
  //       <label for="client">Client: </label>
  //       <br/>  
  //       <input type="text" name="client" id="client"/>
  //       <br/>
  //       <label for="id">Job ID:* </label>
  //       <br/>  
  //       <input type="text" name="id" id="id"/>
  //       <br/>
  //       <label for="faceLink">Face:* </label>
  //       <br/>  
  //       <input type="text" name="faceLink" id="face"/>
  //       <br/>
  //       <label for="screenLink">Screen:* </label>
  //       <br/>  
  //       <input type="text" name="screenLink" id="screen"/>
  //       <br/>
  //       <label for="discription">Discription:* </label>
  //       <br/>  
  //       <Editor
  //       onInit={(evt, editor) => editorRef.current = editor}
  //       initialValue="<p>This is the initial content of the editor.</p>"
  //       init={{
  //       height: 500,
  //       menubar: false,
  //       plugins: [
  //          'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
  //          'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
  //          'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
  //       ],
  //       toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
  //          'alignleft aligncenter alignright alignjustify | ' +
  //          'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
  //       content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  //       }}
  //   />
  //       <br/>
  //       <label for="publish">Publish: </label>
  //       <br/>  
  //       <input id="publishBTN" type="radio" name="publish" value="true" />
  //       Yes &nbsp;&nbsp;
  //       <input id="unpublishBTN" type="radio" name="publish" value="false"/>
  //       No <br/>
  //       <br/>
  //       <button
  //         className="btn btn-primary"
  //         type="submit"
  //         onClick={uploadToServer}
  //       >
  //         Create
  //       </button>
  //     </form>
  //   </div>
  // );

}


export const getStaticProps = async (cont) => {
    return{
      props:{}
    }
  }