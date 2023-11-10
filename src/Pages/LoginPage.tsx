import '../App.css';
import { useNavigate } from "react-router-dom";
import { InputLabel, Loginbutton, StyledForm } from "../Components/StyledComponents/Login";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import Cookies from 'js-cookie';

const createUserFormSchema = z.object({
  username: z.string().min(1, "Insira o nome de usuário"),
  password: z.string().min(1, "Insira a senha"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<Partial<CreateUserFormData>>({});

  useEffect(() => {
    const savedUsername = Cookies.get('username');
    const savedPassword = Cookies.get('password');
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
    }
  }, [])

  const validateForm = (data: CreateUserFormData) => {
    try {
      createUserFormSchema.parse(data);
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.errors.reduce((acc, e) => ({ ...acc, [e.path[0]]: e.message }), {}));
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: CreateUserFormData = { username, password };

    if (validateForm(formData)) {

      const response = await fetch('http://localhost:5079/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      
      if (response.ok) {
        console.log('Login bem-sucedido');
        navigate('/SucessoPage');
        Cookies.set('username', username);
        Cookies.set('password', password);
        Cookies.set('login', 'true');
        handleSubmit(e);
        
      } else {
        console.error('Falha no login');
        setLoginError('Falha no login');
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>
        <h2 style={{ display: "flex", alignContent: "center", justifyContent: "center", marginTop: 0 }}>Login</h2>
        {loginError && <span>{loginError}</span>}
        <InputLabel>
          <label htmlFor="username">Usuário</label>
          <input
            placeholder="Digite seu usuário"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {formErrors.username && <span>{formErrors.username}</span>}
        </InputLabel>
      </div>
      <div>
        <InputLabel style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="password">Senha</label>
          <input
            placeholder="Digite sua senha"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {formErrors.password && <span>{formErrors.password}</span>}
        </InputLabel>
        <Loginbutton type="submit">Entrar</Loginbutton>
      </div>
    </StyledForm>
  );
};

export default LoginPage;
