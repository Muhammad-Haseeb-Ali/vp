import { useState } from "react";

/**
 * # MY ACCOUNT GOOGLE PLAY:
 * @see {@link https://play.google.com/store/apps/developer?id=dzino Google Play}
 */

export default function PrivatePage(props) {

  const uploadToServer = async (event) => {
    event.preventDefault();
    const form = document.getElementById("proposalForm");
    const body = new FormData(form);
    console.error([...body.entries()]);
    fetch("https://backofvp.vercel.app/proposal", {
      method: "POST",
      mode: 'no-cors',
      body
    })
  };

  return (
    <div>
      <form id="proposalForm" action="https://backofvp.vercel.app/proposal" method="post" enctype="multipart/form-data">
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
        <label for="videos">Videos: </label>
        <input id="file" type="file" name="videos" multiple="multiple" required />
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