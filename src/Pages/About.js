import React from "react";
import { useNavigate } from "react-router-dom";


const About = ({setActive}) => {
  const navigate = useNavigate();
  window.onbeforeunload = function(e)
{
    localStorage.setItem('reload-url', window.location.href);
}
window.onload = function(e)
{
    if (localStorage.getItem('reload-url') !== null)
    {
        if (window.location.href === localStorage.getItem('reload-url'))
        {
           setActive("home"); 
           navigate("/");
        }
    }
}
  return (
    <div className="container padding">
      <div className="col-md-12">
        <div className="row mx-0">
          <p>
            This is blog website made by Abhirup Basu . Latest blogs on various topics are found on this website. Like and comment on the blogs u love.
            
          </p>
          <div><h1>❤❤❤</h1></div>
        </div>
      </div>
    </div>
  );
};

export default About;