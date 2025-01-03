import styles from './Profile.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import fakesrc from '../../assets/images/fakesrc.svg';
interface Product {
    productId: string;
    picture: string;
    productName: string;
    price: string;
    description: string;
}



const Profilecontent = ({ name }: { name: string }) => {
    
    const [buyProducts,setbuyProducts] = useState<Product[]>([]);
    const [sellProducts,setsellProducts] = useState<Product[]>([]);


    const number = name === '구매 내역' ? 1 : 2;
    const navigate = useNavigate();
    const location = useLocation();
    const isVertical = location.pathname === '/Profile/1' || location.pathname === '/Profile/2';

    useEffect(() => {
        
        const sellData = async () => {
            try {
                const response = await axios.get('/users/1/sell-product');
                // console.log(response.data.result.products);
                setsellProducts(response.data.result.products);
            } catch (error) {
                console.error('API 요청 중 오류 발생:', error);
            }
        };
        sellData();
    }, []);

    const handleClick = () => {
        const newPath = `${location.pathname}/${number}`;
        navigate(newPath);
    };

    const products = name === '구매 내역' ? buyProducts : sellProducts;

    return (    
        <div className={styles.profilecontent}>
            <div className={styles.contenttitle}>
                <div className={styles.expense}>{name}</div>
                {!isVertical && <div className={styles.expenseplus} onClick={handleClick}>더보기</div>}
            </div>
            <div className={isVertical ? styles.contentcontentVertical : styles.contentcontent}>
                {products.map((item, index) => (
                    <div key={index} className={styles.contentitem}>
                        {item.picture ? (
                            <img src={fakesrc} alt={item.productName} className={styles.contentitemimg} />
                        ) : (
                            <div className={styles.placeholder}>이미지 없음</div>
                        )}
                        <div className={styles.itemname}>{item.productName}</div>
                        <div className={styles.iteminfo}>
                            <div className={styles.itemdescription}>{item.productId}</div>
                            <div className={styles.itemprice}>{item.price}₩</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profilecontent;
