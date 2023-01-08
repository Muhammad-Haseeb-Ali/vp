import { useRef, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import styles from "../../styles/Form.module.css"
import Video from "../../components/Video"
import Discription from "../../components/Description"

/**
 * # MY ACCOUNT GOOGLE PLAY:
 * @see {@link https://play.google.com/store/apps/developer?id=dzino Google Play}
 */

export default function PrivatePage(props) {
  const editorRef = useRef(null);
  const [form, setupForm] = useState({})
  const [stage, changeStage] = useState(1)

  function formHandler(){
    var formData = form
    switch(stage){
      case 1:
        formData.client = document.forms[0][0].value
        formData.id = document.forms[0][1].value
        formData.publish = document.forms[0][2].checked
        setupForm(formData)
        break
      case 2:
        formData.discription = editorRef.current.getContent()
        setupForm(formData)
        break
      case 3:
        formData.screenLink = document.forms[2][0].value
        formData.faceLink = document.forms[2][1].value
        setupForm(formData)
        break
      case 4:
        const body = new FormData()
        Object.entries(form).forEach(([key,val]) => body.append(key,val))
        console.warn(form,body)

      // https://backofvp.up.railway.app
      // http://localhost
  
      fetch("https://backofvp.up.railway.app/proposal/" + body.get('id'), {
        method: "POST",
        mode: 'no-cors',
        body
      })
      .then(()=>{
        const form4 = document.getElementById('form4')
        const button = document.getElementById(styles.buttons)
        form4.innerHTML = "<h1> Hurry! your Video Proposal is submited.<h1/>"
        button.innerHTML = `<a id=${styles.view_button} href='https://videoproposal.vercel.app/proposal?id=${form.id}' >&nbsp;&nbsp;&nbsp;View&nbsp;&nbsp;&nbsp;</a>`
      })
    }
    console.warn(form)

  }

  return (
    <section id={styles.form_sec}>
      <div id={styles.form}>
        <div>
          <h3>Video Proposal</h3>
          <p>Inshallah you will win this project.</p>
        </div>
        <form id="form1" active={stage == 1 && 'active_form'}>
          <input type="text" for="client" placeholder="Client Name" />
          <input type="text" for="id" placeholder="Job Post ID" />
          <br />
          <input type="checkbox" />
          <label>
            &nbsp; Would you like to make it publish.
          </label>
        </form>
        <form id="form2" active={stage == 2 && 'active_form'}>
          <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 330,
              menubar: false,
              plugins: [
                'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </form>
        <form id="form3" active={stage == 3 && 'active_form'}>
          {/* <Video pre="VinF" /> */}
          <label>Linked Videos:</label>
          <input type="text" for="screenLink" placeholder="Background Screen Footage" />
          <input type="text" for="faceLink" placeholder="Your Face Footage" />
        </form>
        <form id="form4" active={stage == 4 && 'active_form'}>
          <h1>UPLOAD YOUR PROPOSAL</h1>
          { stage > 3 &&
            Object.keys(form).map((key)=><p>{key}:&nbsp;{( key == "discription")? JSON.stringify(form[key]).slice(0,20) + "..." : (typeof(form[key]) == "boolean")? JSON.stringify(form[key]) : form[key]}</p>)
          }
          </form>
        <div id={styles.buttons}>
          <button id={styles.back_button} onClick={() => {
            if(stage<4)
            formHandler()
            if(stage > 1)
            changeStage(stage - 1);
          }}>{stage == 1 ? "Cancle" : "Back"}</button>
          <button id={styles.next_button} onClick={() => {
            formHandler()
            if(stage <= 3)
            changeStage(stage + 1)
          }}>{stage == 4 ? "Upload" : "Next"}</button>
        </div>
      </div>
    </section>
  )
}


export const getStaticProps = async (cont) => {
  return {
    props: {}
  }
}