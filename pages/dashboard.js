import axios from 'axios';

export default function Dashboard(){
    function submitForm(e) {
        const form = document.getElementById("form");
        e.preventDefault();
        const name = document.getElementById("name");
        const file = document.getElementById("file");
        const formData = new FormData();
        formData.append("file", file.files[0]);
    
        axios.post('upload_file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      })
    }
    return (
        <>
        <form id='form' encType="multipart/form-data">
        <label for='file'>Select files</label>
        <input id='file' type="file" />
        <button className="submit-btn" type='submit' onClick={e=>submitForm(e)}>Upload</button>
      </form>
      </>
        )
}

export const getStaticProps = async (cont) => {
    return{
      props:{}
    }
  }