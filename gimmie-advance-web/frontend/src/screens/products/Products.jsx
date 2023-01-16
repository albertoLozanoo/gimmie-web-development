import React, {useEffect, useState} from "react"
import { useDispatch } from "react-redux";
import LayoutApp from '../../components/Layout'
import axios from "axios";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, message, Popconfirm, Result } from "antd";
import FormItem from "antd/es/form/FormItem";
import confirm from "antd/es/modal/confirm";
import { Link } from "react-router-dom";

const Products = () =>{

    const dispatch = useDispatch();
    const [productData, setProductData] = useState([]);
    const [popModal, setPopModal] = useState(false);
    const [editProduct,setEditProduct] = useState(false);

    

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
            dispatch({
                type: "HIDE_LOADING",
            });
            console.log(error);
        }
    };

    useEffect(() =>{
        
        getAllProducts();
    }, []);

    const handlerDelete = async (record) => {
        try{
            dispatch({
                type: "SHOW_LOADING",
            });

            await axios.post('/api/products/deleteproducts',{productId:record});
            message.success("Product Deleted succesfully!");
            getAllProducts();
            setPopModal(false);
            dispatch({
                type: "HIDE_LOADING",
            });
            
        }catch(error){
            dispatch({
                type: "HIDE_LOADING",
            });
            message.error("Error!")
            console.log(error);
        }
    }

    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Image",
            dataIndex: "image",
            render:(image,record) => <img src={image} alt={record.name} height={60} width={60}/>
        }, 
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Action",
            dataIndex: "_id",
            render: (id, record) =>
            <div >
                <DeleteOutlined className='cart-action' onClick={() => handlerDelete(record)}/>
                    <Popconfirm placement="leftTop" title={"Ok"} description={"Ok"}
                        onConfirm={confirm} okText="Yes" cancelText="No">
                    </Popconfirm>
                <EditOutlined className="cart-edit" onClick={() => {setEditProduct(record); setPopModal(true)}}/>
            </div> 
            
        }  
    ]

    const handlerSubmit = async (value) => {
        if(editProduct === null){
            try{
                dispatch({
                    type: "SHOW_LOADING",
                });
    
                const res = await axios.post('/api/products/addproducts',value);
                console.log(res);
                message.success("Product added succesfully!");
                getAllProducts();
                setPopModal(false);
                dispatch({
                    type: "HIDE_LOADING",
                });
                
            }catch(error){
                dispatch({
                    type: "HIDE_LOADING",
                });
                message.error("Error!")
                console.log(error);
            }
        } else {
            try{
                dispatch({
                    type: "SHOW_LOADING",
                });
    
                await axios.put('/api/products/updateproducts',{...value, productId: editProduct._id});
                message.success("Product Updated succesfully!");
                getAllProducts();
                setPopModal(false);
                dispatch({
                    type: "HIDE_LOADING",
                });
                
            }catch(error){
                dispatch({
                    type: "HIDE_LOADING",
                });
                message.error("Error!")
                console.log(error);
            }
        }
    }

    const currentUser = JSON.parse(localStorage.getItem("auth")).username

    if (currentUser === "admin"){
        return(

            <LayoutApp>
                <h2 >All Products</h2>
                <Button className="add-new" onClick={() => setPopModal(true)}>Add New</Button>
                <Table dataSource={productData} columns={columns} bordered />
                {
                    popModal && 
                    <Modal title={`${editProduct !== null ? "Edit Product" : "Add New Product"}`} 
                    visible={popModal} onCancel={() => {setEditProduct(null); setPopModal(false);}} footer={false}>
                        <Form layout="vertical" initialValues={editProduct} onFinish={handlerSubmit}>
                            <FormItem name={"name"} label="Name">
                                <Input />
                            </FormItem>
                            <FormItem name={"category"} label="Category">
                                <Select>
                                    <Select.Option value="adidas">Adidas</Select.Option>
                                    <Select.Option value="nike">Nike</Select.Option>
                                    <Select.Option value="jordan">Jordan</Select.Option>
                                </Select>
                            </FormItem>
                            <FormItem name={"price"} label="Price">
                                <Input />
                            </FormItem>
                            <FormItem name={"image"} label="Image URL">
                                <Input />
                            </FormItem>
                            <div className="form-btn-add">
                                <Button htmlType="submit" className="add-new">Add</Button>
                            </div>
                        </Form>    
                </Modal>
                }
            </LayoutApp>
        )
    }else{
        return(
            <Result className="result-404"
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button className="add-new-404"><Link className="add-new-404-link" to="/">Back Home</Link></Button>}
          />
        )
    }
}

export default Products;