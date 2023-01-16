import { Button, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handlerSubmit = async (value) => {
        try{
            dispatch({
                type: "SHOW_LOADING",
            });
            const res = await axios.post('/api/users/login', value);
            const responseLogining = (JSON.stringify(res.data));
            if(responseLogining[2].valueOf() === "m"){
                message.error("Log Failed");
                navigate("/login");
                
            }else if(responseLogining[2].valueOf() === "_"){
                message.success("User logged succesfully!");
                localStorage.setItem("auth",JSON.stringify(res.data));
                navigate("/");
            }

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
            <p>Login</p>
            <div className="form-group">
                <Form layout="vertical" onFinish={handlerSubmit}>
                    
                    <FormItem className="form-group-item" name={"name"} label="Name">
                        <Input />
                    </FormItem>
                    
                    <FormItem  className="form-group-item" name={"password"} label="Password">
                        <Input type="password"/>
                    </FormItem>

                    <div className="form-btn-add">
                        <Button htmlType="submit" className="add-new">Login</Button>
                        <Link to="/register" className="form-other">Register Here!</Link>
                        
                    </div>
                </Form>  
            </div>
        </div>
     
    )
}


export default Login