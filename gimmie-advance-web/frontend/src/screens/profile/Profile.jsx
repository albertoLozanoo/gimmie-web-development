import React, {useState} from "react"
import { useDispatch } from "react-redux";
import LayoutApp from '../../components/Layout'
import axios from "axios";
import {} from '@ant-design/icons';
import { Button, Form, Input, Modal, message } from "antd";
import FormItem from "antd/es/form/FormItem";


//<Button className="update-user" onClick={() => setPopModal(true)}>Update user</Button>

const Products = () =>{

    const dispatch = useDispatch();
    const [popModal, setPopModal] = useState(false);
    const [editUser,setEditUser] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem("auth")).username
    const currentUserEmail = JSON.parse(localStorage.getItem("auth")).email
    //const currentUserId = (JSON.parse(localStorage.getItem("auth"))._id)

    const handlerSubmit = async (value) => {
            try{
                dispatch({
                    type: "SHOW_LOADING",
                });
    
                await axios.put('/api/users/updateuser',{...value, userId: editUser._id});
                message.success("User Updated succesfully!");
                //getAllProducts();
                setPopModal(false);
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
        <LayoutApp>
            <div className="profile-tag">
                <h2>Gimmie</h2>
                <p>My Profile</p>
            </div>
                <div >
                    
                        <Form layout="vertical" className="profile-info">
                            <FormItem name={"name"} label="Username">
                                <span>{currentUser}</span>
                            </FormItem>
                            <FormItem name={"email"} label="Email">
                                <span>{currentUserEmail}</span>
                            </FormItem>
                            
                        </Form>  
                        
                    
            </div>
            {
                popModal && 
                <Modal title={"Edit Profile"} 
                visible={popModal} onCancel={() => {setEditUser(null); setPopModal(false);}} footer={false}>
                    <Form layout="vertical" initialValues={editUser} onFinish={handlerSubmit}>
                        <FormItem name={"username"} label="Username">
                            <Input />
                        </FormItem>
                        <FormItem name={"password"} label="Password">
                            <Input type="password"/>
                        </FormItem>
                        <div className="form-btn-add">
                            <Button htmlType="submit" className="add-new">Add</Button>
                        </div>
                    </Form>   
                    
                     
            </Modal>
            }
        </LayoutApp>
    )
}

export default Products;