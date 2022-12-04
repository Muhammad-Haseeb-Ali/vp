import { useState } from "react";

/**
 * # MY ACCOUNT GOOGLE PLAY:
 * @see {@link https://play.google.com/store/apps/developer?id=dzino Google Play}
 */

export default function PrivatePage(props) {

  const uploadToServer = async (event) => {
    const file = document.getElementById("file");
    const body = new FormData();
    body.append("file", file.files[0]);
    const response = await fetch("/api/upload", {
      method: "POST",
      body
    })
    console.log(response)
  };

  return (
    <div>
      <div>
        <h4>Select Zip Folder</h4>
        <input id="file" type="file" name="myImage" />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
        >
          Send to server
        </button>
      </div>
    </div>
  );
}


export const getStaticProps = async (cont) => {
    return{
      props:{}
    }
  }