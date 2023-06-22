import React, { useEffect, useState } from 'react'

import { Space, Table, Row, Col, Button, Image, Tag, message, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link,  } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';



const IndexPages = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/api/users')
            .then((res) => {
                var count = 0;
                res.data.data.forEach(element => {
                    element.key = count++;
                });
                setData(res.data.data)
            })
            .catch((err) => {
                message.error(err)
            })
    }, []);

    const confirm = () =>
        new Promise((resolve) => {
            setTimeout(() => resolve(null), 1000);
        });

    const handleButtonClickDelete = (id) => {
        confirm().then((result) => {
            if (result === null) {
                axios.delete(`http://localhost:8080/api/users/${id}`)
                    .then((res) => {
                        message.success('Success')
                        setData(data.filter((item) => item._id !== id))

                    })
                    .catch((err) => {
                        message.error(err)
                    })
            }
        });
    }


    const columns = [
        {
            title: 'Profile',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <Image
                style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
                src={text}
            />,
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (text) => {
                if (text === 'male') {
                    return <Tag color="blue">{text}</Tag>
                } else if (text === 'female') {
                    return <Tag color="magenta">{text}</Tag>
                } else {
                    return <Tag color="purple">{text}</Tag>
                }
            }
        },
        {
            title: 'Birthday',
            key: 'birthDate',
            dataIndex: 'birthDate',
            render: (text) => {
                return (

                    <p>{moment(text, "YYYYMMDD").format('DD MMM YYYY')}</p>
                )
            },
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex:'_id',
            render: (text) => {
                return (
                    <Space size="middle">
                        <Link to={`/edit-user/${text}`}>
                            <Button type="primary">
                                <span> <EditOutlined /> Edit</span>
                            </Button>
                        </Link>

                        

                        <Popconfirm
                            title="Delete user from table"
                            onConfirm={() => {
                                handleButtonClickDelete(text)
                            }}
                        >
                            <Button type="primary" id={text} danger>
                                <span><DeleteOutlined /> Delete</span>
                            </Button>
                        </Popconfirm>
                    </Space>
                )
            }

            ,
        },
    ];


    return (
        <div>
            <h1 style={
                { padding: '20px' }
            }>User list</h1>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '20px',
                }}>
                <Link to="/add-user">
                    <Button type="primary">Add + </Button>
                </Link>
            </div>
            <div>
                <Row>
                    <Col md={24} xs={24} xl={24} >
                        <Table columns={columns} dataSource={data} style={
                            { overflowX: 'auto' }
                        } />
                    </Col>
                </Row>


            </div>
        </div>

    )
}

export default IndexPages