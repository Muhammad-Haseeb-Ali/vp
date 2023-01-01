import { useState } from "react";
import Video from '../../components/Video'

/**
 * # MY ACCOUNT GOOGLE PLAY:
 * @see {@link https://play.google.com/store/apps/developer?id=dzino Google Play}
 */

export default function PrivatePage(props) {

  const uploadToServer = async (event) => {
    event.preventDefault();
    const formData = document.getElementById("proposalForm"),
          formFace = document.getElementById("faceForm"),
          formScreen = document.getElementById("screenForm"),
          dataBody = new FormData(formData),
          faceBody = new FormData(formFace),
          screenBody = new FormData(formScreen);

    // https://backofvp.up.railway.app
    // http://localhost
    fetch("https://backofvp.up.railway.app/proposal/" + dataBody.get('id'), {
      method: "POST",
      mode: 'no-cors',
      body: dataBody
    })

    fetch("https://backofvp.up.railway.app/proposal/" + dataBody.get('id') + "/video/face", {
      method: "POST",
      mode: 'no-cors',
      body: faceBody
    })
    
    fetch("https://backofvp.up.railway.app/proposal/" + dataBody.get('id') + "/video/screen", {
      method: "POST",
      mode: 'no-cors',
      body: screenBody
    })
  };

  return (
    <div>
      <Video/>
      <form id="faceForm">
        <label for="face">Face: </label>
        <input id="file" type="file" name="face" required />
      </form>
      <form id="screenForm">
        <label for="screen">Screen: </label>
        <input id="file" type="file" name="screen" required />
      </form>
      <form id="proposalForm">
        <h4>Create Proposal</h4>
        <label for="client">Client: </label>
        <br/>  
        <input type="text" name="client" id="client"/>
        <br/>
        <label for="id">Job ID:* </label>
        <br/>  
        <input type="text" name="id" id="id"/>
        <br/>
        <label for="discription">Discription:* </label>
        <br/>  
        <textarea name="discription" id="discription" rows="10" cols="50" maxlength="300"/>
        <br/>
        <label for="publish">Publish: </label>
        <br/>  
        <input id="publishBTN" type="radio" name="publish" value="true" />
        Yes &nbsp;&nbsp;
        <input id="unpublishBTN" type="radio" name="publish" value="false"/>
        No <br/>
        <br/>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
        >
          Create
        </button>
      </form>
    </div>
  );
}


export const getStaticProps = async (cont) => {
    return{
      props:{}
    }
  }