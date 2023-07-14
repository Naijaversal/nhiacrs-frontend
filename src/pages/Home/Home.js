import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss"; 
import nhiaLogo from "../../assets/nhia-logo.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
    
        <div className= "image">
        <img src={nhiaLogo} alt="NHIA Logo" />
        </div>

        <div className="welcome1 kolor">
        Cross River State NHIA Digital Office
        </div>
        

        <ShowOnLogout>
            <div className="welcome2 kolor">
            Login with a Digital Office account to continue
            </div>
          </ShowOnLogout>
        <div class="flex gap-3 justify-center items-center">

        <ShowOnLogout>
                <button className="btn relative btn-primary" as="button">
                  <Link to="/login" >
                    <p>Login</p>
                  </Link>
                </button>
            </ShowOnLogout>

           <ShowOnLogin> 
                <button className="btn relative btn-primary" as="button">
                    <Link to="/dashboard">
                      <p>Dashboard</p>
                    </Link>
                </button>
            </ShowOnLogin>
        </div>
    </div>
  )
};

export default Home