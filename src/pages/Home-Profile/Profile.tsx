import Bottombar from "../../components/common/Bottombar/Bottombar.tsx";
import React ,{useState,useEffect}from 'react';
import styles from "./Profile.module.css"
import setting from "../../assets/images/Profile-setting.svg"
import heart from "../../assets/images/Profile-heart.svg";
import Profilecontent from "./Profilecontent.tsx";
import Back from "../Home-category/Back.tsx";
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import userProfile from "../../assets/images/k.svg"


interface ProfileContentProps {
    nickname: string;
    department: string;
    // buyProducts: Product[];
    // sellProducts: Product[];
    // name: string; // "구매 내역" or "판매 내역"
}

const Profiletitle = () =>{
    const [profileData, setProfileData] = useState<ProfileContentProps>({
            nickname: '',
            department: '',
            // buyProducts: [{ productId: '', picture: '', productName: '', price: '', description: '' }],
            // sellProducts: [{ productId: '', picture: '', productName: '', price: '', description: '' }],
            // name: name,
        });
        const userId = localStorage.getItem('userId');

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/users/${userId}/myPage`);
                    setProfileData(response.data.result);
                } catch (error) {
                    console.error('API 요청 중 오류 발생:', error);
                }
            };
           
            fetchData();
        }, []);
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    const settingClick = () => {
        const newPath = `/setting`; 
        navigate(newPath); // 페이지 이동
      };
    const scrapClick = () =>{
        const newPath = `/scrap`; 
        navigate(newPath);
    };
    return(
        <div className={styles.profiletitle}>
            <div className={styles.profilebox}>
                <div className={styles.titleimg}>
                    <img 
                        src={userProfile} 
                        alt="프로필" 
                        className={styles.profileImage}
                    />
                </div>
                <div className={styles.name}>{profileData.nickname}</div>
                <div className={styles.subject}>{profileData.department}</div>
                <img src={heart} alt="" className={styles.setting} onClick = {scrapClick} />
                <img src={setting} alt="" className={styles.setting} onClick={settingClick}/>
            </div>
        </div>
    );
}

const Profile = () =>{
    return(<>
<Back prob="프로필"/>
<Profiletitle/>
<Profilecontent name ={"구매 내역"}/>
<Profilecontent name ={"판매 내역"}/>

<Bottombar/>
</>);
}
export default Profile;