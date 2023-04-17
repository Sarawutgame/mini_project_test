// import logo from './logo.svg';
import catim from "../images.jpg";
import "./listgroup.css";
import TextField from "@mui/material/TextField";

import { useState, useEffect } from "react";

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import SearchIcon from "@mui/icons-material/Search";
import { datagroup } from "../data/data";
import { data } from "../data/data";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function CardGroup(props) {
  const { id, name_group, descript, name_create } = props;
  let navigate = useNavigate();
  console.log(id);
  return (
    <div className="card-g">
      <div className="box-img">
        <img src={catim} className="card-pic" alt="card-im" />
      </div>
      <h3
        style={{
          fontSize: "24px",
          margin: "10px",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {name_group}
      </h3>
      <h4 style={{ margin: "5px", marginLeft: "10px" }}>About Group</h4>
      <p
        style={{
          fontSize: "16px",
          margin: "10px",
          marginTop: "5px",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {descript}
      </p>
      <h4
        style={{
          fontSize: "16px",
          margin: "10px",
          marginTop: "5px",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {name_create}
      </h4>
      <div className="button-contrainer">
        <button
          className="link-button"
          onClick={() => {
            navigate("/post", {
              state: {
                id: id,
              },
            });
          }}
        >
          <h4 style={{ margin: "0", color: "white" }}>Go to Group...</h4>
        </button>
      </div>
    </div>
  );
}

function GroupPage() {
  let box = datagroup();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  function handleClose() {
    setOpen(false);
  }

  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }
  // const [name, setName] = useState('');
  const [desc, setDesc] = useState("");
  const [group, setGroup] = useState("");

  const createGroup = async () => {
    await addDoc(collection(db, "grouppet"), {
      name_group: group,
      descript: desc,
      name_create: "KongATC",
    });
    handleClose();
  };

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  console.log("images ", images);

  // const mockdata = [
  //     {id:'1', name_group: 'Sweet Cat', descript:'เเมวๆ', name_create: 'KongATC'},
  //     {id:'2', name_group: 'Eiei', descript:'เเมวๆ', name_create: 'KongATC'},
  //     {id:'3', name_group: 'Doge', descript:'เเมวๆ', name_create: 'KongATC'},
  //     {id:'4', name_group: 'Cat coin', descript:'เเมวๆ', name_create: 'Game'}]

  return (
    <div className="contrainer">
      <div className="group-chat">
        <h2 className="header">Group In My Pet</h2>
        <hr className="line"></hr>
      </div>
      <div className="group-post-tool">
        <button className="create-button" onClick={handleOpen}>
          <h2 style={{ margin: "0" }}> + Create Group</h2>
        </button>
        <div className="search-group">
          <SearchIcon fontSize="large" />
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            style={{ marginLeft: "15px" }}
          />
        </div>
      </div>
      <div className="card-group">
        {box.map((el_item) => {
          return <CardGroup {...el_item} key={el_item.id} />;
        })}
      </div>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box className="modal-create-group">
              <div className="modal-head">
                <h1 style={{ marginBottom: "0", marginLeft: "0" }}>
                  สร้างกลุ่มใหม่
                </h1>
                <hr className="line2" />
              </div>
              <div className="form-in">
                <form>
                  <div style={{ marginBottom: "2%" }}>
                    <h3 style={{ margin: "0", marginLeft: "2%" }}>ชื่อกลุ่ม</h3>
                    <input
                      type="text"
                      placeholder="Ex. เเมวเมียวๆ"
                      onChange={(e) => setGroup(e.target.value)}
                      style={{
                        width: "50%",
                        height: "40px",
                        borderRadius: "20px",
                        padding: "2%",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "2%" }}>
                    <h3 style={{ margin: "0", marginLeft: "2%" }}>
                      เกี่ยวกับกลุ่ม
                    </h3>
                    <textarea
                      placeholder="พิมพ์ได้เลย"
                      rows={2}
                      onChange={(e) => setDesc(e.target.value)}
                      style={{
                        width: "90%",
                        borderRadius: "20px",
                        padding: "2%",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginBottom: "2%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h3 style={{ margin: "0", marginLeft: "2%" }}>รูปกลุ่ม</h3>
                    {/* <input type='text' placeholder="Img file" style={{width:'50%', height:'40px', borderRadius:'20px',padding:'2%'}}/> */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onImageChange}
                      className="upload-image"
                    />
                    {imageURLs.map((imageSrc) => (
                      <img
                        src={imageSrc}
                        alt="Pre View Image"
                        className="image-preview"
                      />
                    ))}
                  </div>
                </form>
                <div className="button-con2">
                  <button
                    className="button-summit-newgroup"
                    onClick={createGroup}
                  >
                    <h2 style={{ margin: 0, fontWeight: 300, color: "white" }}>
                      Create Group
                    </h2>
                  </button>
                </div>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default GroupPage;
