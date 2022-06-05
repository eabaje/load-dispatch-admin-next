import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  getFiles,
  uploadDocuments,
  uploadMedia,
} from "../../helpers/uploadImage";
import { GlobalContext } from "../../context/Provider";
import { IMG_URL } from "../../constants";
import UploadWidget from "./upload-widget";
import CustomPopup from "../popup/popup.component";
import UpdateFileUpload from "./edit-file-upload";
import UploadFileWidget from "./upload-file-widget";

export default function DocumentUpload(props) {
  const {
    refId,
    title,
    backArrow,
    role,
    SetFormStep,
    uploadType,
    popupCloseHandlerImage,
  } = props;
  const [width, setWidth] = useState(-1);
  const [currentFile, setCurrentFile] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [imageInfos, setImageInfos] = useState([]);
  const [imageGallery, setImageGallery] = useState([
    {
      src: null,
    },
  ]);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [visibilityImage, setVisibilityImage] = useState(false);
  const [visibilityFile, setVisibilityFile] = useState(false);
  const measureRef = React.useRef();

  // const selectFile = async (e) => {
  //   setCurrentFile(e.target.files[0]);
  //   if (props.fileType === "image") {
  //     setPreviewImage(URL.createObjectURL(e.target.files[0]));
  //   }
  //   setProgress(0);
  //   setMessage("");
  // };
  useEffect(() => {
    //  alert(props.refId);
    if (refId !== undefined) {
      const res = getFiles(props.refId);
      setImageInfos(res.data);
    }
  }, []);
  function upload() {
    setProgress(0);
    uploadDocuments(
      uploadType,
      currentFile,
      refId,

      (event) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      }
    )((res) => {
      setProgress(0);
      console.log("GetFiles", getFiles(props.refId));
      setImageInfos(getFiles(props.refId));
    })((err) => {
      setProgress(0);
      setMessage(`Could not upload the ${props.fileType}!${err.message}`);
      setCurrentFile(undefined);
    });
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <span style={{ display: "inline-block" }}> </span>
          {backArrow && (
            <span style={{ display: "inline-block", float: "right" }}>
              {" "}
              <a href="#" onClick={SetFormStep}>
                <i
                  className="fa fa-arrow-left"
                  aria-hidden="true"
                  title="Go back"
                ></i>
              </a>
            </span>
          )}
        </div>
      </div>
      <UploadFileWidget
        title={props.title}
        fileType={"document"}
        refId={props.refId}
        uploadType={uploadType}
        upload={upload}
        popupCloseHandlerImage={popupCloseHandlerImage}
      />

      <div className="card-header">List of Files</div>
      <ul className="list-group list-group-flush">
        {imageInfos &&
          imageInfos.map((img, index) => (
            <li className="list-group-item" key={index}>
              <a href={img.ImgPath}>
                <i
                  className="fa fa-file"
                  aria-hidden="true"
                  style={{ cursor: "hand" }}
                ></i>
                {img.FileName}{" "}
              </a>
              <i
                className="fa fa-pen"
                aria-hidden="true"
                style={{ cursor: "hand" }}
                title="Edit Document"
                id={img.MediaId}
                onClick={() => {
                  setVisibilityImage(!visibilityImage);
                  setMediaId(img.MediaId);
                }}
              ></i>
              &nbsp;|&nbsp;
              <i
                className="fa fa-trash"
                aria-hidden="true"
                title="Delete Document"
                id={img.MediaId}
                onClick={(e) => deleteDoc(e)}
              ></i>
            </li>
          ))}
      </ul>
      {visibilityFile && (
        <CustomPopup onClose={popupCloseHandler} show={visibilityFile}>
          <UploadFileWidget
            refId={props.refId}
            fileType={"document"}
            uploadType={uploadType}
            mediaId={mediaId}
            popupCloseHandlerImage={popupCloseHandlerImage}
          />
        </CustomPopup>
      )}
    </>
  );
}
