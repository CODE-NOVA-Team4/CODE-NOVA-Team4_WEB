import styles from "./Hcategory.module.css";
import heart from "../../assets/images/Hcategory-heart.svg"
import React from "react";



const Categoryitems = () =>{
    const categories = [
        { name:"미개봉 로봇 공학 전자 서적", src: "/images/major-books.png",time:"22시간전",heart:"3",price:"12,000"  },
        { name: "미개봉 로봇 공학 전자 서적", src: "/images/cheatsheets.png",time:"22시간전",heart:"3",price:"12,000"  },
        { name: "미개봉 로봇 공학 전자 서적", src: "/images/stationery.png",time:"22시간전",heart:"3",price:"12,000" },
        { name: "미개봉 로봇 공학 전자 서적", src: "/images/electronics.png",time:"22시간전",heart:"3",price:"12,000"  },
        { name: "미개봉 로봇 공학 전자 서적", src: "/images/clothing.png",time:"22시간전",heart:"3",price:"12,000" },
      ];
    return(<div className={styles.categoryitemsbox}>
                {categories.map((Category,index)=>(
                    <div key={index} className={styles.itembox}>
                        <div className={styles.circle}></div>
                        <div className={styles.information}>
                            <div className={styles.contenttop}>
                                <div className={styles.typename}>{Category.name}</div>
                                <div className={styles.time}>{Category.time}</div>

                            </div>
                            <div className={styles.contentbottom}>
                                <div className={styles.price}>{Category.price}</div>
                                <div className={styles.heart}><img src={heart} alt="heart"></img>{Category.heart}</div>
                            </div>
                            

                        </div>
                    </div>
                ))}    </div>)
}
export default Categoryitems