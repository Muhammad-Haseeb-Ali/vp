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
    console.error(body,[...body.entries()]);
    const response = await fetch("/api/proposal/post", {
      method: "POST",
      body
    })
    console.log(response)
  };

  return (
    <div>
      <form id="proposalForm" action="/api/proposal/post" method="post">
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
        {/* Disable file uploading code */}
        {/* <label for="zipFile">File: </label>
        <input id="file" type="file" name="zipFile" max="1" required />
        <br/> */}
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