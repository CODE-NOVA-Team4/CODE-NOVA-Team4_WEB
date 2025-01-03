import styles from "./Hcategory.module.css";
import heart from "../../assets/images/Hcategory-heart.svg"
import React ,{useState,useEffect}from "react";

import axios from "axios";
interface Product {
    productId: string;
    picture: string;
    productName: string;
    price: string;
    description: string;
 }
const Categoryitems = () =>{
        const [Products,setProducts] = useState<Product[]>([]);
    
        useEffect(() => {
         
          const sellData = async () => {
              try {
                  const response = await axios.get('/users/1/wish-product');
                  console.log(response.data.result.products);
                  setProducts(response.data.result.products);
              } catch (error) {
                  console.error('API 요청 중 오류 발생:', error);
              }
          };
          sellData();
        }, []);
    
    return(<div className={styles.categoryitemsbox}>
                {Products.map((Category,index)=>(
                    <div key={index} className={styles.itembox}>
                        <img alt="circle" src={Category.picture}className={styles.circle}></img>
                        <div className={styles.information}>
                            <div className={styles.contenttop}>
                                <div className={styles.typename}>{Category.productName}</div>
                                <div className={styles.time}>{Category.productId}일 전</div>

                            </div>
                            <div className={styles.contentbottom}>
                                <div className={styles.price}>{Category.price}₩</div>
                                {/* <div className={styles.heart}><img src={heart} alt="heart"></img>{Category.heart}</div> */}
                            </div>
                            

                        </div>
                    </div>
                ))}    </div>)
}
export default Categoryitems