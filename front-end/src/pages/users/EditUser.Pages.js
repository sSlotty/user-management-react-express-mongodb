import React, { useState, useEffect, } from 'react';
import { Col, Row, Button, Form, Input, Select, DatePicker, Upload, Image, message } from 'antd';
import { Link } from 'react-router-dom';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';
import moment from 'moment';

const EditUserPages = () => {
    const [form] = Form.useForm();

    const [fileList, setFileList] = useState([])
    const [previewImage, setPreviewImage] = useState('');
    const { userId } = useParams();
    const navigate = useNavigate();




    useEffect((event) => {
        if (userId.length <= 0) {
            navigate('/')
        }
        axios.get('http://localhost:8080/api/users/' + userId)
            .then((res) => {
                res.data.data.birthDate = moment(res.data.data.birthDate)

                var newData = {
                    user: res.data.data
                }
                form.setFieldsValue(newData)

                setPreviewImage(res.data.data.image)

                window.setTimeout(() => {
                });
            })
            .catch((err) => {
                message.error(err.message)
                navigate('/')
            })
    }, [userId]);






    const propUpload = {
        beforeUpload: ({ fileList: newFileList }) => {
            setFileList(fileList)
            return false;
        },
        onChange: async ({ fileList: newFileList }) => {
            await setFileList(newFileList);
            await handlePreviewImage(newFileList[0])
        },
        fileList,
        multiple: false,
        accept: 'image/*',
        maxCount: 1,
        showUploadList: false,
    }



    const RemoveImage = () => {
        setFileList([])
        setPreviewImage('')
    }

    const onSubmit = async (value) => {
        if (!previewImage) {
            message.error('Please upload image')
            return
        }


        value.user.image = previewImage
        value.user.birthDate = value.user.birthDate['$d']

        try {

            var result = await axios.put('http://localhost:8080/api/users/' + userId, value.user)


            if (result.status === 200) {
                message.success('Success')
                form.resetFields()
                setFileList([])
                setPreviewImage('')
                navigate('/')
            } else {
                message.error('Failed')
            }

        } catch (err) {
            message.error(err.message)
            navigate('/')

        }



    };

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handlePreviewImage = async (file) => {
        if (!file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.preview);
    };


    return (
        <div >
            <h1 style={
                { padding: '20px' }
            }>Edit user page</h1>
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
                <Row className='row'>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} >
                        <div style={
                            {
                                padding: '20px',
                                display: 'flex',
                                justifyContent: 'center'
                            }
                        }>
                            <Image
                                width={200}
                                src={previewImage ? previewImage : 'https://via.placeholder.com/200'}

                            />
                        </div>
                        <div
                            style={
                                {
                                    padding: '20px',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }
                            }
                        >

                            <Row>
                                <Col>
                                    <div style={
                                        {
                                            padding: '20px',
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Upload {...propUpload} >
                                            <Button icon={<UploadOutlined />} type="primary">Click to Upload</Button>
                                        </Upload>
                                    </div>
                                </Col>
                                <Col >
                                    <div style={
                                        {
                                            padding: '20px',
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                        <Button icon={<DeleteOutlined />} danger type="primary" onClick={RemoveImage}> Remove Image</Button>

                                    </div>
                                </Col>
                            </Row>
                        </div>

                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} >

                        <Form
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            layout="horizontal"
                            style={{
                                maxWidth: 600,
                            }}
                            form={form}
                            onFinish={onSubmit}
                        >

                            <Form.Item
                                label="First name"
                                name={['user', 'firstName']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your first name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item label="Last name"
                                name={['user', 'lastName']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your last name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item label="Gender"
                                name={['user', 'gender']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select gender'
                                    }
                                ]}
                            >
                                <Select>
                                    <Select.Option value="male">Male</Select.Option>
                                    <Select.Option value="female">Female</Select.Option>
                                </Select>
                            </Form.Item>


                            <Form.Item label="BirthDate"
                                name={['user', 'birthDate']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select Date of Birth day',
                                    }
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>


                            <Form.Item
                                wrapperCol={{
                                    offset: 4,
                                    span: 24,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>




            </div>
        </div>

    )
}

export default EditUserPages