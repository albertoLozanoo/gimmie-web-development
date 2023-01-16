import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutApp from "../../components/Layout";
import {DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined} from '@ant-design/icons';
import {  Button, Form, Input, message, Modal, Select, Table } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const [subTotal, setSubTotal] = useState(0);
    const [billPopUp, setBillPopUp] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {cartItems} = useSelector(state => state.rootReducer);

    const handlerIncrement = (record) => {
        dispatch({
            type: "UPDATE_CART",
            payload: {...record, quantity: record.quantity + 1}
        });
        
    };

    const handlerDecrement = (record) => {

        if(record.quantity !==1){
            dispatch({
                type: "UPDATE_CART",
                payload: {...record, quantity: record.quantity - 1}
            });
            
        }
        
    };

    const handlerDelete = (record) => {
        dispatch({
            type: "DELETE_FROM_CART",
            payload: record
        });
        
    };

    const handlerDeleteAll = (record) => {
        dispatch({
            type: "DELETE_ALL_ITEMS",
            payload: record
        })
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
            title: "Quantity",
            dataIndex: "_id",
            render: (id,record) => 
                <div>
                    <MinusCircleOutlined className='cart-minus' onClick={() => handlerDecrement(record)}/>
                    <strong className="cart-quantity">{record.quantity}</strong>
                    <PlusCircleOutlined className='cart-plus' onClick={() => handlerIncrement(record) }/>
                    
                </div>
            
        },
        {
            title: "Action",
            dataIndex: "_id",
            render: (id, record) => <DeleteOutlined className='cart-action' onClick={() => handlerDelete(record)}/>
        }
        
    ]

    var cartEmpty = 0;

    if(cartItems.length === 0){
        cartEmpty = 1;
    }else{
        cartEmpty = 0;
    }

    

    useEffect(() => {
        let temp = 0;
        cartItems.forEach((product) => (temp = temp + product.price * product.quantity));
        setSubTotal(temp);
    }, [cartItems])

    const handlerSubmit = async(value) => {
        try{
            const newObject = {
                ...value,
                cartItems,
                subTotal: Number(subTotal).toFixed(2),
                tax: Number(((subTotal/100)*4).toFixed(2)),
                totalAmount: Number((Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))).toFixed(2)),
                customerId: JSON.parse(localStorage.getItem("auth"))._id,
                customerName: JSON.parse(localStorage.getItem("auth")).username,
            }
            await axios.post("/api/bills/addbills", newObject);
            message.success("Bill Added Succesfully!");
            navigate("/bills");
            handlerDeleteAll();
            
        } catch(error){
            message.error("Error!");
            console.log(error);
        }
    }

    if(cartEmpty === 1){
        return(
            <LayoutApp>
                <h2>Cart</h2>
                <Button  className="delete-all-disabled" disabled  onClick={handlerDeleteAll}><DeleteOutlined /></Button>
                <Table dataSource={cartItems} columns={columns} bordered></Table>
                
                <div className="subTotal">
                    <h2>Sub Total: <span>{(subTotal).toFixed(2)} €</span> </h2>
                    <Button onClick={() => setBillPopUp(true)} className="add-new-disabled" disabled>Create order</Button>
                </div>
                <Modal title="Create Order" visible={billPopUp} onCancel={() => setBillPopUp(false)} footer={false}>
                    <Form layout="vertical" onFinish={handlerSubmit}>
                        <FormItem name={"customerName"} label="Customer Name">
                            <Input readonly="readonly" defaultValue={JSON.parse(localStorage.getItem("auth")).username} value={JSON.parse(localStorage.getItem("auth")).username}></Input>
                        </FormItem>
                        <FormItem name={"customerPhone"} label="Customer Phone">
                            <Input type="number"/>
                        </FormItem>
                        <FormItem name={"customerAddress"} label="Customer Address">
                            <Input />
                        </FormItem>
                        <FormItem name={"paymentCategory"} label="Payment Method">
                            <Select>
                                <Select.Option value="cash">Cash</Select.Option>
                                <Select.Option value="paypal">Paypal</Select.Option>
                                <Select.Option value="MasterCard">MasterCard</Select.Option>
                            </Select>
                        </FormItem>
                        <div className="total">
                            <span>SubTotal: {(subTotal).toFixed(2)} €</span><br></br>
                            <span>Tax: {((subTotal/100)*4).toFixed(2)} €</span>
                            <h3>Total: € {(Number(subTotal) + Number(((subTotal/100)*10).toFixed(2))).toFixed(2)}</h3>
                        </div>
                        
                        <div className="form-btn-add">
                            <Button htmlType="submit" className="add-new" >Accept Order</Button>
                        </div>
                    </Form>   
                </Modal>
            </LayoutApp>
            )
    }else{
        return(
            <LayoutApp>
                <h2>Cart</h2>
                <Button  className="delete-all" onClick={handlerDeleteAll}><DeleteOutlined /></Button>
                <Table dataSource={cartItems} columns={columns} bordered></Table>
                
                <div className="subTotal">
                    <h2>Sub Total: <span>{(subTotal).toFixed(2)} €</span> </h2>
                    <Button onClick={() => setBillPopUp(true)} className="add-new">Create order</Button>
                </div>
                <Modal title="Create Order" visible={billPopUp} onCancel={() => setBillPopUp(false)} footer={false}>
                    <Form layout="vertical" onFinish={handlerSubmit}>
                        <FormItem name={"customerName"} label="Customer Name">
                            <Input readonly="readonly" defaultValue={JSON.parse(localStorage.getItem("auth")).username} value={JSON.parse(localStorage.getItem("auth")).username}></Input>
                        </FormItem>
                        <FormItem name={"customerPhone"} label="Customer Phone">
                            <Input type="number"/>
                        </FormItem>
                        <FormItem name={"customerAddress"} label="Customer Address">
                            <Input />
                        </FormItem>
                        <FormItem name={"paymentCategory"} label="Payment Method">
                            <Select>
                                <Select.Option value="cash">Cash</Select.Option>
                                <Select.Option value="paypal">Paypal</Select.Option>
                                <Select.Option value="MasterCard">MasterCard</Select.Option>
                            </Select>
                        </FormItem>
                        <div className="total">
                            <span>SubTotal: {(subTotal).toFixed(2)} €</span><br></br>
                            <span>Tax: {((subTotal/100)*4).toFixed(2)} €</span>
                            <h3>Total: € {(Number(subTotal) + Number(((subTotal/100)*10).toFixed(2))).toFixed(2)}</h3>
                        </div>
                        
                        <div className="form-btn-add">
                            <Button htmlType="submit" className="add-new" >Accept Order</Button>
                        </div>
                    </Form>   
                </Modal>
            </LayoutApp>
        )
    };
};

export default Cart