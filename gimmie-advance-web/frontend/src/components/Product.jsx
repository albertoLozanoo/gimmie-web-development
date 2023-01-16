import React, { useState } from "react"
import { Button, Card, Form, Modal, Select } from 'antd';
import { useDispatch } from "react-redux";
import FormItem from "antd/es/form/FormItem";



const Product = ({product}) => {

    const dispatch = useDispatch();

    const [popModal, setPopModal] = useState(false);

    const handlerToCart = () => {

        dispatch({
            type: "ADD_TO_CART",
            payload: {...product,quantity:1}
        })
        
    }
    const {Meta} = Card;
    return(
     
        <Card  hoverable style={{width: 240,marginBottom: 30}} cover={<img alt={product.name} src={product.image} style={{height: 200}} />}
        >
            <Meta title= {product.name}  description={`${product.price} €`}/>
          
            <div className="product-btn">
            
                <Button onClick={() => {setPopModal(true); }}>
                    Add To Cart
                </Button>
                
            </div>
            {
                popModal && 
                    <Modal title="Select size" 
                    visible={popModal} onCancel={() => {setPopModal(false);}} footer={false}>
                        <Form layout="vertical" onFinish={handlerToCart}>
                            <FormItem className= "tittle-select-size" name={"sizeFoot"} label="Size">
                                <Select className="form-select" placeholder="Select your size...">
                                    <Select.Option value="35">35</Select.Option>
                                    <Select.Option value="36">36</Select.Option>
                                    <Select.Option value="37">37</Select.Option>
                                    <Select.Option value="38">38</Select.Option>
                                    <Select.Option value="39">39</Select.Option>
                                    <Select.Option value="40">40</Select.Option>
                                    <Select.Option value="41">41</Select.Option>
                                    <Select.Option value="42">42</Select.Option>
                                    <Select.Option value="43">43</Select.Option>
                                    <Select.Option value="44">44</Select.Option>
                                    <Select.Option value="45">45</Select.Option>
                                    <Select.Option value="46">46</Select.Option>
                                    <Select.Option value="47">47</Select.Option>
                                </Select>
                            </FormItem>
                            
                            <FormItem >
                                <div className="product-btn">
                                
                                    <Button className="form-btn" onClick={() => {setPopModal(false); handlerToCart();  }}>
                                        Add To Cart
                                    </Button>
                                    
                                    
                                </div>
                                
                            </FormItem>
                            
                        </Form>
                        
                    </Modal>
                    
            }

        </Card>
        
    );
  };


  

export default Product 


