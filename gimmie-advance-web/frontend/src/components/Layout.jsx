import React from 'react';
import {
  HomeOutlined,
  UserSwitchOutlined,
  MoneyCollectOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import './layout.css';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Spinner from "./../components/Spinner"



const { Header, Sider, Content } = Layout;

const LayoutApp = ({children}) => {

  const {cartItems, loading} = useSelector(state => state.rootReducer) 

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem("auth")).username
  const currentEmail = JSON.parse(localStorage.getItem("auth")).email

  const handlerDeleteAll = (record) => {
    dispatch({
        type: "DELETE_ALL_ITEMS",
        payload: record
    })
  }
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  
  useEffect(() => {
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
  }, [cartItems]);


  

  if(currentUser === "admin"){
    return (
      <Layout>
      {loading && <Spinner />}
      <Sider trigger={null}  >
        <div className="logo" >
        <img className="logo-tittle" id='logo-Tittle' src='/images/logoGimmieSinFondo.png' alt="logoGimmie" width={130} />
        </div>
  
        <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname}>
            <Menu.Item key='/' icon={<HomeOutlined/>}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key='/products' icon={<ShoppingOutlined/>}>
              <Link to="/products">Products</Link>
            </Menu.Item>
            <Menu.Item key='/bills' icon={<MoneyCollectOutlined/>}>
              <Link to="/bills">Orders</Link>
            </Menu.Item>
            <Menu.Item key='/customers' icon={<UserSwitchOutlined/>}>
              <Link to="/customers">Customers</Link>
            </Menu.Item>
            <Menu.Item key='/logout' icon={<LogoutOutlined/>} onClick={() => {localStorage.removeItem("auth"); handlerDeleteAll(); navigate("/login");}}>
              <Link to="/logout">Log out</Link>
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>    
        <div></div>
          <div className="cart-items" onClick={() => navigate('/cart')}>
            <ShoppingCartOutlined />
            <span className="cart-badge">{cartItems.length}</span>
          </div>

        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          
          <div className='div-children'>
            
            {children}

          </div>
        </Content>
        <footer class="footer">
          <div class="container">
            <div class="row">
              <div class="footer-col">
                <h4>company</h4>
                <ul>
                  <li><a href="/">about us</a></li>
                  <li><a href="/">our services</a></li>
                  <li><a href="/">privacy policy</a></li>
                  <li><a href="/">affiliate program</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <h4>get help</h4>
                <ul>
                  <li><a href="/users">FAQ</a></li>
                  <li><a href="/bills">shipping</a></li>
                  <li><a href="/bills">returns</a></li>
                  <li><a href="/bills">order status</a></li>
                  <li><a href="/users">payment options</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <h4>online shop</h4>
                <ul>
                  <li><a href="/">Jordan</a></li>
                  <li><a href="/">Nike</a></li>
                  <li><a href="/">Adidas</a></li>
                  
                </ul>
              </div>
              <div class="footer-col">
                <h4>follow us</h4>
                <div class="social-links">
                  <a href="/"><img class="fab fa-facebook-f" src="/images/facebook.png" alt="FacebookIcon" width={40}/></a>
                  <a href="/"><img class="fab fa-twitter" src='/images/twitter.png' alt="TwitterIcon" width={40}/></a>
                  <a href="/"><img class="fab fa-instagram" src='/images/instagram.png' alt="InstagramIcon" width={40}/></a>
                  <a href="/"><img class="fab fa-linkedin-in" src='/images/linkedin.webp' alt="LinkedinIcon" width={40}/></a>
                </div>
              </div>
            </div>
          </div>
          <div className="f-copyrow">
          <p>&copy; 2022. All Rights Reserved. Powered by Gimmie +  
                 </p>
          </div>
        </footer>

      </Layout>
    </Layout>
    

    );
  }else{
    return(
      <Layout>
      {loading && <Spinner />}
      <Sider trigger={null} >
      <div className="logo">
          <img className="logo-tittle" src='/images/logoGimmieSinFondo.png' alt="logoGimmie" width={130}/>
        </div>
        <div>
        
          
        </div>
        <Menu  theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname}>
          
            <Menu.Item key='/' icon={<HomeOutlined/>}>
              <Link className="layout-links" to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key='/bills' icon={<MoneyCollectOutlined/>}>
              <Link className="layout-links" to="/bills">Orders</Link>
            </Menu.Item>
            <Menu.Item key='/users' icon={<UserOutlined />}>
              <Link className="layout-links" to="/users">Profile</Link>
            </Menu.Item>
            <Menu.Item key='/logout' icon={<LogoutOutlined/>} onClick={() => {localStorage.removeItem("auth"); handlerDeleteAll(); navigate("/login");}}>
              <Link className="layout-links" to="/logout">Log out</Link>
            </Menu.Item>
            
        </Menu>
        <div className='user-info-tag'> 
            <h4><Link className='user-info-tag-link' to={"/users"}>@{currentUser}</Link></h4>
            <p><Link className='user-info-tag-link-h4' to={"/users"} >{currentEmail}</Link></p>
          </div>
      </Sider>
      <Layout className="site-layout">
          
        <Header style={{ padding: 0, background: colorBgContainer }}>
        <div></div>
         <div className="cart-items" onClick={() => navigate('/cart')}>
            <ShoppingCartOutlined />
            <span className="cart-badge">{cartItems.length}</span>
          </div>
        </Header>
        <Content style={{margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer}}> 
          
          <div className='div-children'>
            
            {children}

          </div>

        </Content>
        
        <footer class="footer">
          <div class="container">
            <div class="row">
              <div class="footer-col">
                <h4>company</h4>
                <ul>
                  <li><a href="/">about us</a></li>
                  <li><a href="/">our services</a></li>
                  <li><a href="/">privacy policy</a></li>
                  <li><a href="/">affiliate program</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <h4>get help</h4>
                <ul>
                  <li><a href="/users">FAQ</a></li>
                  <li><a href="/bills">shipping</a></li>
                  <li><a href="/bills">returns</a></li>
                  <li><a href="/bills">order status</a></li>
                  <li><a href="/users">payment options</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <h4>online shop</h4>
                <ul>
                  <li><a href="/">Jordan</a></li>
                  <li><a href="/">Nike</a></li>
                  <li><a href="/">Adidas</a></li>
                  
                </ul>
              </div>
              <div class="footer-col">
                <h4>follow us</h4>
                <div class="social-links">
                  <a href="/"><img class="fab fa-facebook-f" src="/images/facebook.png" alt="FacebookIcon" width={40}/></a>
                  <a href="/"><img class="fab fa-twitter" src='/images/twitter.png' alt="TwitterIcon" width={40}/></a>
                  <a href="/"><img class="fab fa-instagram" src='/images/instagram.png' alt="InstagramIcon" width={40}/></a>
                  <a href="/"><img class="fab fa-linkedin-in" src='/images/linkedin.webp' alt="LinkedinIcon" width={40}/></a>
                </div>
              </div>
            </div>
          </div>
          <div className="f-copyrow">
          <p>&copy; 2022. All Rights Reserved. Powered by Gimmie +  
                 </p>
          </div>
        </footer>


      </Layout>
      
    </Layout>
    )
  }
};

export default LayoutApp;
