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
          body = new FormData(formData)

    // https://backofvp.up.railway.app
    // http://localhost
    
      fetch("https://backofvp.up.railway.app/" + body.get('id'), {
      method: "POST",
      mode: 'no-cors',
      body
    })  

  };

  return (
    <div>
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
        <label for="face">Face:* </label>
        <br/>  
        <input type="text" name="face" id="face"/>
        <br/>
        <label for="screen">Screen:* </label>
        <br/>  
        <input type="text" name="screen" id="screen"/>
        <br/>
        <label for="discription">Discription:* </label>
        <br/>  
        <textarea name="discription" id="discription" rows="30" cols="50" maxlength="1000"/>
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