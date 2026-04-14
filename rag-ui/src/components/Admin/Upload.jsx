import React, { useState } from "react";
import './Upload.css';
import {getAuth} from 'firebase/auth';

function Upload() {
  const [file,setFile]=useState(null);
  const [selectedFileName, setSelectedFileName] = useState('No file chosen');
  const [textContent, setTextContent] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName('No file chosen');
    }
  };
  const auth=getAuth();

  const handleUpload = async (e) => {
    e.preventDefault();
    if(!file && !textContent.trim()) {
      return setStatus('Please select a file or enter text to upload.');
    }

    setLoading(true);
    setStatus('Processing...');
    try{
      const user=auth.currentUser;
      const token=await user.getIdToken();


      const formData=new FormData();
      if(file) formData.append('file', file);
      if(textContent.trim()) formData.append('text', textContent);

      const response=await fetch("http://localhost:8000/admin/upload",{
        method:'POST',
        headers:{
          'Authorization': `Bearer ${token}`
        },
        body:formData
      });

      const result=await response.json();
      if(response.ok){
        setStatus(' Uploaded successfully!');
        setSelectedFileName('No file chosen');
        setTextContent('');
      }
      else{
        setStatus(result.message || 'Upload failed. Please try again.');
      }
      
      }
      catch(err){
        console.error(err);
        setStatus('An error occurred. Please try again.');
      }
      finally{
        setLoading(false);
      
    }
  };

  return (
    <div className="upload-page">
      <h1>Upload Knowledge Base</h1>
      <div className="upload-card">
        <div className="upload-card-inner">
          <div>
            <label className="upload-label">Upload File</label>
            <div className="file-upload">
              <label htmlFor="kb-file" className="file-button">Choose File</label>
              <span className="file-text">{selectedFileName}</span>
              <input id="kb-file" type="file" onChange={handleFileChange} />
            </div>
          </div>

          <div className="separator"><span>OR</span></div>

          <div>
            <label className="upload-label">Paste Text</label>
            <textarea
              className="upload-textarea"
              placeholder="Paste your knowledge base content here..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
            />
          </div>

          <button className="upload-submit" onClick={handleUpload}>
            Upload Knowledge
          </button>
        </div>
      </div>
    </div>
  );
}

export default Upload;
