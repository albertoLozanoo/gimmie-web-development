import axios from "axios";
import React, { useEffect,useState } from "react";
import LayoutApp from "../../components/Layout";
import { useDispatch } from "react-redux";
import { Button, Result, Table  } from "antd";
import { Link } from "react-router-dom";


const Customers = () => {
    
    const [customerData,setCustomerData] = useState([]);
    const dispatch = useDispatch();  

    const getAllUsers = async () =>{
        try{
            dispatch({
                type: "SHOW_LOADING",
            });

            const {data} = await axios.get('/api/users/getcustomers');
            setCustomerData(data);
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
        
        getAllUsers();
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "_id"
        },
        {
            title: "Username",
            dataIndex: "username"
        },
        {
            title: "Password",
            dataIndex: "password",
        }, 
        {
            title: "Email",
            dataIndex: "email",
        }, 
    ]

    const currentUser = JSON.parse(localStorage.getItem("auth")).username

    if(currentUser === "admin"){
        return(
            <LayoutApp>
                <h2 className="title-table">All Customers</h2>
                <Table dataSource={customerData} columns={columns} bordered />
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

export default Customers;

