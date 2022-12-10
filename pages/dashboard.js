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
      <form id="proposalForm">
        <h4>Create Proposal</h4>
        <label for="client">Client: </label>
        <input type="text" name="client" id="client"/>
        <br/>
        <label for="zipFile">File: </label>
        <input id="file" type="file" name="zipFile" max="1" required />
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