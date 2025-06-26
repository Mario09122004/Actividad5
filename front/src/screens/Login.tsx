import { Outlet } from "react-router-dom";
import { Button, Form, Input, Card, Typography, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
//import { useAuth } from './../auth/AuthContex'

const { Title } = Typography;

const CLIENT_ID = "656169630035-1s360encavdbr859j38ndt73s8trm6j0.apps.googleusercontent.com"; // Reemplaza con tu client ID

function Login(){
    
  const [formData] = Form.useForm();
  //const{ login } = useAuth();
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handlerSubmit = async () => {
  try {
    const values = formData.getFieldsValue();

    if (!captchaValue) {
      alert("Por favor completa el CAPTCHA.");
      return;
    }

    const response = await fetch('http://localhost:5000/api/auth/login-user', {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({
            ...values,
            captcha: captchaValue
        })
        });
        recaptchaRef.current.reset();

        const data = await response.json();
        console.log('Respuesta del servidor: ', data);

        if (data.success) {
        // login(data.accessToken); // si usas autenticación con tokens
        navigate('/');
        formData.resetFields();
        
        } else {
          alert(data.message || 'Inicio de sesión fallido');
          formData.resetFields();
        }

    } catch (error) {
        console.log('Error ocurrido en el login: ', error);
        alert("Error al iniciar sesión");
    }
    };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    const res = await fetch('http://localhost:5000/api/auth/google-login', {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ token })
    });
    const data = await res.json();
    if (data.success) {
      // localStorage.setItem('token', data.token); // Si usas JWT
      // Guarda la matrícula si la necesitas
      // localStorage.setItem('matricula', data.matricula);
      window.location.href = '/'; // O usa navigate si tienes react-router
    } else {
      alert(data.message || 'Error al iniciar sesión con Google');
    }
  };

  const handleGoogleFailure = () => {
    alert('Error al iniciar sesión con Google');
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
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
                sitekey="6LcdkW0rAAAAACKXMGebmpFcrhhcmlBpup9AxEwD"
                onChange={(value) => setCaptchaValue(value)}
              />
            </div>

            <Form.Item style={{ marginBottom: 16 }}>
              <Button type="primary" htmlType="submit" onClick={ handlerSubmit } block>
                Iniciar Sesión
              </Button>
            </Form.Item>
          </Form>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </Card>
      </Col>
    </Row>
    </GoogleOAuthProvider>
  );
};

export default Login;