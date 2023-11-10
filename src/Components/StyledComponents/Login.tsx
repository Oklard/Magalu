import styled from "styled-components"

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255,255,255,0.8);
    padding: 20px;
    border-radius: 5px;
    width: 300px;
    margin: 0 auto;
    margin-top: 100px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    font-family: 'Poppins', sans-serif;
`
export const Loginbutton = styled.button`
  border: none;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    width: 100%;
    background-color: #7d2ecc;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        background-color: #2737ae;
    }
`
export const InputLabel = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
    label {
        margin-bottom: 5px;
    }
    input {
        border: none;
        border-radius: 5px;
        padding: 10px;
        font-size: 16px;
        transition: 0.2s;
        &:focus {
            outline: none;
            box-shadow: 0 0 5px rgba(0,0,0,0.2);
        }
    }
    `