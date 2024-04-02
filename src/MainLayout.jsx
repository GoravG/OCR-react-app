import React, { useState } from 'react'
import { createWorker } from 'tesseract.js';

function MainLayout() {
    const [loading, setloading] = useState(false);

    const [result, setRes] = useState("");
    const [imageData, setImageData] = useState(null);
    const handleUpload = (e) => {
        setImageData(e.target.files[0]);
    }

    const doOCR = async () => {
        setloading(true);
        const worker = await createWorker('eng');
        const ret = await worker.recognize(imageData);
        await worker.terminate();
        setRes(ret.data.text);
        setloading(false);
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand">Optical Character Recognition</a>
                </div>
            </nav>
            <div className="container w-50">
                <div className="mb-3">
                    <label htmlFor="img" className="form-label mt-5 fw-bolder">Upload A File</label>
                    <input className="form-control shadow" type="file" id="img" accept='image/*' onChange={handleUpload} />
                </div>
                {imageData && (
                    <img className='shadow' src={URL.createObjectURL(imageData)} alt="text" width={450} />
                )}
                {result && (<div className="card mt-3 text mb-3 shadow" >
                    <div className="card-header">Result
                    </div>
                    <div className="card-body">
                        <p className="card-text">{result}</p>
                    </div>
                </div>
                )}
                {loading && (<div class="text-center mt-5">
                    <div class="spinner-grow" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>)}
                <div><button className='btn btn-dark shadow mt-2 ' onClick={doOCR}>DO OCR</button></div>
            </div >
        </>
    )
}

export default MainLayout