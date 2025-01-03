import Topbar from "../../components/common/Topbar/Topbar.tsx";
import Bottombar from "../../components/common/Bottombar/Bottombar.tsx";
import React from 'react';
import styles from "./Setting.module.css"
import Back from "../Home-category/Back.tsx";
import Settinginfo from "./Settinginfo.tsx";
const Setting = () =>{
    return(<>
<Topbar/>
<Back prob="프로필 설정"/>
<Settinginfo/>
<Bottombar/>
</>);
}
export default Setting;