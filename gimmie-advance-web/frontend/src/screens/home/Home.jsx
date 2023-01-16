import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import LayoutApp from '../../components/Layout'
import Product from '../../components/Product'
import axios from 'axios'
import { Col, Row } from 'antd'
import { useDispatch } from "react-redux"


const Home = () => {

    const dispatch = useDispatch();

    const [productData, setProductData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('jordan');
    const categories = [
        {
            name: "jordan",
            imageURL: "/images/logo-jordan.png",
        },
        {
            name: "nike",
            imageURL: "/images/logo-nike.png",
        },
        {
            name: "adidas",
            imageURL: "/images/logo-adidas.png",
        }
    ]

    useEffect(() =>{
        const getAllProducts = async () =>{
            try{
                dispatch({
                    type: "SHOW_LOADING",
                });

                const {data} = await axios.get('/api/products/getproducts');
                setProductData(data);
                dispatch({
                    type: "HIDE_LOADING",
                });
                console.log(data);
            }catch(error){
                console.log(error);
            }
        };
        getAllProducts();
    }, [dispatch]);


    return(
        <LayoutApp>
            
            <div className="category">
                {categories.map((category) => (
                    <div key={category.name} className={`categoryFlex ${selectedCategory === category.name && 'category-active'}`} 
                    onClick={() => setSelectedCategory(category.name)}>
                        <h3 className="categoryName">{category.name}</h3>
                        <img className="img-home-display" src={category.imageURL} alt={category.name} height= {60} width= {60}  />
                    </div>
                ))}
            </div>
            
            

            <Row >
                {productData.filter((i) => i.category === selectedCategory).map (product => (
                    <Col xs={24} sm= {6} md={12} lg= {6}>
                        <Product key={product.id} product = {product}/>
                    </Col>
                ))} 
            </Row>
        </LayoutApp>
    )
}

export default Home