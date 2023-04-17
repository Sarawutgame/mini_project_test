import "./lostdetail.css";
import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerF,
} from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import catim from "../photo-1611915387288-fd8d2f5f928b.jpg";
import { data } from "../data/data";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function Hi() {
  return console.log("hi");
}

function HintItem(props) {
  const { id_hint, create_hint_name, datetime, hint_des } = props;
  console.log(id_hint);
  return (
    <div className="hint-con">
      <div className="user-hint-con">
        <img src={catim} alt="img-pro" className="img-pro-con" />
        <h3 className="name-hint">{create_hint_name}</h3>
        <p className="pro-create">{datetime}</p>
      </div>
      <div className="content-hint">{hint_des}</div>
    </div>
  );
}

// function Map() {
//   const center = { lat: 44, lng: -80 };
//   const [selected, setSelected] = useState(null);

//   return (
//     <>
//       <GoogleMap
//         zoom={10}
//         center={center}
//         mapContainerClassName="contrainer-map"
//       >
//         <MarkerF position={center} />
//       </GoogleMap>
//     </>
//   );
// }

function Lostdetail(props) {
  const location = useLocation();
  const [help, setHelp] = useState("");
  //map
  
  const [selected, setSelected] = useState(null);
  const {
    id,
    ani_name,
    ani_type,
    tel,
    dateloss,
    gender,
    desc,
    lostdesc,
    lineID,
  } = props;
  const box = location.state;
  const box_com = location.state.commentH;
  const po = location.state.position

  console.log(location, "this is lostdetail", po);
  const center = po;
  //add comment help
  const submitComment = () => {
    box_com.push({
      id_hint: uuidv4(),
      hint_des: help,
      create_hint_name: "KongAtc",
      datetime: "15/04/2023 16.30",
    });

    updateDoc(doc(db, "lostpet", box.id), {
      comment_help: box_com,
    });
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBq4bTmnk639n0aFAsqZyNjh5MEVffRWXs",
  });
  if (!isLoaded) return <div>Loading . . .</div>;
  // const hint_mock = [
  //   {id_hint:'1', create_hint_name:'GamePoro', datetime:'16/0402023 22.20', hint_des:'อาจจะอยู่ที่เเถวสวน'},
  //   {id_hint:'2', create_hint_name:'GamePoro', datetime:'16/0402023 22.20', hint_des:'อาจจะอยู่ที่เเถวสวนหน้าซอย'}]
  return (
    <div className="contrainer">
      <div className="header-name">
        <h1 style={{ marginTop: "20px", marginBottom: "20px" }}>
          ชื่อน้อง : {location.state.name}
        </h1>
      </div>

      <div className="img-header">
        <h2 className="header-img-text">รูปของน้อง</h2>
      </div>
      <div className="img-contrainer">
        <img src={catim} alt="img-show" className="img-detail" />
      </div>
      <div className="detail-box">
        <div className="header-box">
          <h1 style={{ margin: "0px" }}>รายระเอียดของน้อง</h1>
          <hr />
        </div>
        <div className="detail-content">
          <div className="contrain-info">
            <div className="contrain-info1">
              <h4 className="text-detail">ชื่อ : {location.state.name}</h4>
              <h4 className="text-detail">สายพันธ์ุ : {location.state.type}</h4>
              <h4 className="text-detail">เพศ : {location.state.gender}</h4>
              <h4 className="text-detail">
                วันที่หาย : {location.state.dateloss}
              </h4>
              <h4 className="text-detail">เจ้าของ/ผู้ที่เเจ้ง : ????</h4>
            </div>
            <div className="contrain-info2">
              <h2 style={{ margin: "0px" }}>ช่องทางการติอต่อ</h2>
              <h4 className="text-detail">Tel : {location.state.tel}</h4>
              <h4 className="text-detail">Line : {location.state.lineID}</h4>
              <h4 className="text-detail">Facebook : Mena Manae</h4>
            </div>
          </div>
          <div className="contrain-info3">
            <div className="longdetail1">
              <h4 style={{ margin: "0px", marginBottom: "5px" }}>
                ลักษณะเด่น :
              </h4>
              {location.state.desc}
            </div>
            <div className="longdetail1">
              <h4 style={{ margin: "0px", marginBottom: "5px" }}>
                รายละเอียดการหาย :{" "}
              </h4>
              {location.state.lostdesc}
            </div>
          </div>
        </div>
      </div>
      <div>
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="contrainer-map"
        >
          <MarkerF position={center} />
        </GoogleMap>
      </div>
      <div className="hint-contrainer">
        <h2 style={{ margin: "0px" }}>เบาะเเสช่วยหาน้อง</h2>
        <hr />
      </div>
      <div className="hint-box">
        {box_com.map((el_item) => {
          return <HintItem {...el_item} key={el_item.id_hint} />;
        })}
      </div>
      <form>
        <div style={{ marginBottom: "2%", marginLeft: "5%" }}>
          <h3 style={{ margin: "0", marginLeft: "2%" }}>
            เเจ้งเบาะเเสช่วยหาน้อง
          </h3>
          <textarea
            placeholder="Ex. เห็นน้องอยู่เเนวหน้าซอย"
            onChange={(e) => setHelp(e.target.value)}
            rows={3}
            style={{ width: "90%", borderRadius: "20px", padding: "2%" }}
          />
        </div>
      </form>
      <div className="button-con2">
        <button className="button-summit" onClick={submitComment}>
          <h2 style={{ margin: 0, fontWeight: 300, color: "white" }}>เเจ้ง</h2>
        </button>
      </div>
    </div>
  );
}

export default Lostdetail;
