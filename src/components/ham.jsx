import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ham from "./ham.png";
import { AuthContext } from "./authContext.js";

const Tab = ({isclick}) => {
    return (
        isclick && <div style={{display : "flex", width: "100%", height : "120px",flexDirection : "column", 
        justifyContent : "space-evenly", alignItems : "center", backgroundColor : "gray"}}>
        <div style={{backgroundColor : "black", color : "white", width : "fit-content",
    margin : "2%", padding : "10px", borderRadius : "10px"}}><Link style={{color : "white"}}to="/">Home</Link></div>
        <div style={{backgroundColor : "black", color : "white", width : "fit-content",
    margin : "2%", padding : "10px", borderRadius : "10px"}}><Link style={{color : "white"}}to="/">Support</Link></div>
        </div>
    )
}

const Ham = () => {
    const { user, logout } = useContext(AuthContext);


    const [isopen, setopen] = useState(false);
    return (
        <>
        <div className="flex justify-between p-[10px] border-b border-black rounded-[20px] md:hidden">
            <img style={{marginLeft : "10%", height : "50px"}} onClick={() => {setopen(!isopen)}}
            src={ham} />
            {user && <div style={{overflowWrap : "break-word"}}><Link style={{fontSize : "20px",
        marginTop : "5px"}} to="/profile">{user}</Link></div>}
            {!user ? (
        <div style={{marginLeft : "auto", marginRight : "10%"}}>
          <Link to="/login"><button className="btnlgout" type="submit" style={{width : "fit-content", backgroundColor : "orange" ,
                  borderRadius : "5px", padding: "10px 20px", color : "white", border : "none"}}>
              Login/Signup
          </button>
          </Link>
        </div>
      ) : (
        <div style={{ marginRight : "10%"}}>
          <Link to="/"><button className="btnlgout" type="submit" onClick={logout} style={{width : "fit-content", backgroundColor : "orange" ,
                  borderRadius : "5px", padding: "10px 20px", color : "white", border : "none"}}>
              Logout
          </button>
          </Link>
        </div>
      )}
        </div>
        <Tab isclick={isopen} />
        </>
    );
}

const nav = {
    display: "flex",
    justifyContent: "space-between",
    padding : "10px",
    borderRadius: "20px",
    borderBottom : "1px solid black",
  };

export default Ham;