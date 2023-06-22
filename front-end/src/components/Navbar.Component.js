import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Layout, Menu, theme,  } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const Navbar = () => {




    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="layout">
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor:'#0079FF'
                }}
            >
                <Link
                    to="/"
                    style={{
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginRight: 'auto',
                        marginLeft: '24px',
                    }}
                >
                    User Management
                </Link>
                
                <div
                
                    style={{
                        lineHeight: '64px',
                        marginLeft: 'auto',
                        float: 'right',
                        color: 'white',
                    }}
                >
                    <UserOutlined />
                </div>

                
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        minHeight: '280px',
                    }}
                >
                    <Outlet />

                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©2023 Created by Ant UED
            </Footer>
        </Layout>
    );
};
export default Navbar;