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

          faceBody.append('upload_preset','njbonmyz');
          screenBody.append('upload_preset','njbonmyz');

          faceBody.append('cloud_name','dkj8rkz8z');
          screenBody.append('cloud_name','dkj8rkz8z');

    // https://backofvp.up.railway.app
    // http://localhost
    
      fetch("https://backofvp.up.railway.app/proposal/" + dataBody.get('id'), {
      method: "POST",
      mode: 'no-cors',
      body: dataBody
    })

      fetch("https://api.cloudinary.com/v1_1/dkj8rkz8z/video/upload/first", {
      method: "POST",
      mode: 'no-cors',
      body: faceBody
    })

      fetch("https://api.cloudinary.com/v1_1/dkj8rkz8z/video/upload/first", {
      method: "POST",
      mode: 'no-cors',
      body: screenBody
    })  



    

  };

  return (
    <div>
      <Video/>
      <form id="faceForm">
        <label for="video">Face: </label>
        <input id="face_video" type="file" name="video" required />
      </form>
      <form id="screenForm">
        <label for="video">Screen: </label>
        <input id="screen_video" type="file" name="video" required />
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