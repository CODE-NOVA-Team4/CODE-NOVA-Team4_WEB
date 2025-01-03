import Topbar from "../../components/common/Topbar/Topbar.tsx";
import Bottombar from "../../components/common/Bottombar/Bottombar.tsx";
import React from 'react';
import Homemain from "./Homemain/Homemain.tsx";
const Home = () =>{
    return(<>
<Topbar/>
<Homemain/>
<Bottombar/>
</>);
}
export default Home;