import { Outlet } from "react-router-dom";
import { Button, Form, Input, Card, Typography, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
//import { useAuth } from './../auth/AuthContex'

const { Title } = Typography;

function Login(){
    
  const [formData] = Form.useForm();
  //const{ login } = useAuth();
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handlerSubmit = async () =>{
    try{
        console.log('Form data: ', formData);
        /*
      const values=formData.getFieldsValue();
      const responce = await fetch('http://localhost:3000/api/auth/login-user',{
        method:'POST',
        headers:{'Content-Type':"application/json"},
        body: JSON.stringify(values)
      })

      const data = await responce.json();
      console.log(data);
      login(data.accessToken);
      navigate('/');
      formData.resetFields();
      */

    } catch (error){
      console.log('Error ocurrido en el login: ', error)
    }
  }

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={22} sm={16} md={12} lg={8}>
        <Card>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Iniciar de sesión</Title>
          
          <Form
            form={formData}
            layout="vertical"
          >
            <Form.Item
              label="Correo Electrónico"
              name="correo"
              rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}
            >
              <Input placeholder="Correo" />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
            >
              <Input.Password placeholder="Contraseña" />
            </Form.Item>

            <div style={{ marginBottom: 16 }}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="TU_SITE_KEY_AQUI"
                onChange={(value) => setCaptchaValue(value)}
              />
            </div>

            <Form.Item style={{ marginBottom: 16 }}>
              <Button type="primary" htmlType="submit" onClick={ handlerSubmit } block>
                Iniciar Sesión
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;