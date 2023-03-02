import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { uploadImg } from "../redux/imageAction";
const Upload = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [setfile, setSetfile] = useState(false);
  const [url, setUrl] = useState("");
  const [memeimg, setMemeimg] = useState({
    name: "",
    tags: "",
  });
  const handleChange = (e) => {
    setMemeimg({ ...memeimg, [e.target.name]: e.target.value });
  };
  const submit = () => {
    dispatch(uploadImg({ ...memeimg, imageUrl: url }));
  };
  return (
    <>
      <div
        style={{
          height: "100%",
          width: "400px",
          marginInline: "auto",
          marginBlock: "20px",
        }}
      >
        <form>
          <TextField
            style={{ marginBlock: "10px" }}
            id="standard-basic"
            fullWidth
            size="small"
            onChange={handleChange}
            name="name"
            label="Name"
            variant="standard"
          />
          <br />
          <TextField
            size="small"
            style={{ marginBlock: "10px" }}
            id="standard-basic"
            fullWidth
            onChange={handleChange}
            name="tags"
            label="Tags (must be seperated by comma)"
            variant="standard"
          />
        </form>
        <Previews
          setSetfile={setSetfile}
          setUrl={setUrl}
          setLoading={setLoading}
        />
        {setfile &&
          (loading ? (
            <Loading />
          ) : (
            <Button
              style={{ marginInline: "auto", width: "100px", display: "block" }}
              variant="contained"
              onClick={submit}
            >
              Upload
            </Button>
          ))}
      </div>
    </>
  );
};
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "400px",
  height: "300px",
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "400px",
  height: "300px",
  objectFit: "scale-down",
};

function Previews({ setSetfile, setUrl, setLoading }) {
  const uploadImage = (e) => {
    setLoading(true);
    const imgData = new FormData();
    imgData.append("file", e[0]);
    imgData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    imgData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
    fetch(import.meta.env.VITE_BASE_URL, {
      method: "post",
      body: imgData,
    })
      .then((resp) => resp.json())
      .then((imgData) => {
        console.log(imgData.url);
        setUrl(imgData.url);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setSetfile(true);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      uploadImage(acceptedFiles);
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <div
        style={{ cursor: "pointer" }}
        {...getRootProps({ className: "dropzone" })}
      >
        <input required {...getInputProps()} />
        <p style={{ textAlign: "center" }}>
          Drag 'n' drop some files here, or click to select files
          <br />
          <DriveFolderUploadIcon style={{ fontSize: "48px" }} />
        </p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}

export default Upload;
