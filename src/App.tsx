import "./App.css";
import { InputLabel, Loginbutton, StyledForm } from "./Components/Login";
import React, { useState } from "react";
import { z } from "zod";

const createUserFormSchema = z.object({
  username: z.string().min(1, "Insira o nome de usuário"),
  password: z.string().min(1, "Insira a senha"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<Partial<CreateUserFormData>>({});

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
      // Form is valid, proceed with submission
      alert(username + " " + password);

      // The fetch logic can be added here
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>
        <h2 style={{ display: "flex", alignContent: "center", justifyContent: "center", marginTop: 0 }}>Login</h2>
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

export default App;

// const response = await fetch('/api/login', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     username,
//     password,
//   }),
// });