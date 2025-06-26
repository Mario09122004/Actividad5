import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Card, Typography, Row, Col } from 'antd';
import ReCAPTCHA from 'react-google-recaptcha';

const { Title } = Typography;

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handlerSubmit = async (values) => {
    if (!captchaValue) {
      alert("Por favor completa el CAPTCHA.");
      return;
    }

    try {
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
        console.log('Inicio de sesión exitoso', data.token);
        localStorage.setItem('token', data.token);

        form.resetFields();
        navigate('/alumnos');
      } else {
        alert(data.message || 'Inicio de sesión fallido');
        form.resetFields();
      }

    } catch (error) {
      console.error('Error ocurrido en el login: ', error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={22} sm={16} md={12} lg={8}>
        <Card>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Iniciar sesión</Title>

          <Form
            form={form}
            layout="vertical"
            onFinish={handlerSubmit}
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

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Iniciar Sesión
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
