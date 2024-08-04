import React from "react";
import { Link } from "react-router-dom";
import './index.css';
import reel from './reel.png';
import bord from './navborder.png';

const Nv = () => {

  const sbmt = () => {
    localStorage.removeItem("userid");
  };

  return (
    <div className="navv" style={nav}>
      <img className="reeel" src={reel} width={"80px"} height={"80px"} style={{marginLeft : "10%", marginTop : "0.5vh"}} />
      {localStorage.getItem("userid")&&<div className="usr" style={{}}>
        <div style={{overflowWrap : "break-word"}}><Link to="/profile" >{localStorage.getItem("userid")}</Link></div>
      </div>}
      <div className="home" style={{paddingTop : "30px"}}>
        <Link className="lnk" style={{padding : "5px", borderRadius : "10px"}} to="/">Home</Link>
      </div>
      {/*<div className="mypst" style={{paddingTop : "30px"}}>
        <Link className="lnk" to="/">All&nbsp;Posts</Link>
  </div>*/}
      <div className="sprt" style={{paddingTop : "30px"}}>
        <Link className="lnk" style={{padding : "5px", borderRadius : "10px"}} to="/">Support</Link>
      </div>
      <div className="srh" style={search}>
        <input name="srch" style={{borderRadius : "20px", border : "none"}} placeholder=" Search by tags.."></input>
      </div>
      {!localStorage.getItem("userid")&&<div style={{marginLeft : "auto", marginRight : "10%"}}>
        <Link to="/login" ><button className="btnlgout" type="submit" style={{width : "fit-content", backgroundColor : "orange" ,
                borderRadius : "5px", padding: "10px 20px", color : "white", border : "none"}}>
            Login/Signup
        </button>
        </Link>
      </div>}
      {localStorage.getItem("userid")&&<div style={{marginLeft : "auto", marginRight : "10%"}}>
        <Link className="lnklogout" to="/" ><button className="btnlgout"type="submit" onClick={sbmt} style={{width : "fit-content", backgroundColor : "orange" ,
                borderRadius : "5px", padding: "10px 20px", color : "white", border : "none"}}>
            Logout
        </button>
        </Link>
      </div>}
    </div>
  );
};

const nav = {
  display: "flex",
  justifyContent: "center",
  padding : "10px",
  borderRadius: "20px",
  borderBottom : "1px solid black",
};

const search = {
 
};



export default Nv;
