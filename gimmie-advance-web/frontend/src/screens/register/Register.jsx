import { Button, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import {Link, useNavigate} from 'react-router-dom';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlerSubmit =  async(value) => {
        try{
            dispatch({
                type: "SHOW_LOADING",
            });

            await axios.post('/api/users/register',value);
            message.success("User registered succesfully!");
            navigate("/login");   
            
            dispatch({
                type: "HIDE_LOADING",
            });
            
        }catch(error){
            dispatch({
                type: "HIDE_LOADING",
            });
            message.error("Error!");
            console.log(error);
        }
    }

    return(
   
        <div className="form">
            <h2>Gimmie</h2>
            <p>Register</p>
            <div className="form-group">
                <Form layout="vertical" onFinish={handlerSubmit}>
                    
                    <FormItem className="form-group-item" name={"username"} label="Username">
                        <Input />
                    </FormItem>

                    <FormItem  className="form-group-item" name={"email"} label="Email">
                        <Input className="form-input-userid" />
                    </FormItem>
                    
                    <FormItem  className="form-group-item" name={"password"} label="Password">
                        <Input type="password"/>
                    </FormItem>

                    <div className="form-btn-add">
                        <Button htmlType="submit" className="add-new">Register</Button>
                        <Link to="/login" className="form-other">Login Here!</Link>
                    </div>
                </Form>  
            </div>
        </div>
    

        
        
    )
}


export default Register



