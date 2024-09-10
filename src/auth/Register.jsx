import { useState } from "react";
import { useDispatch } from "react-redux"
import InputText from "../utils/InputText";
import ErrorText from './../utils/ErrorText';
import { signup } from './../redux/userSlice';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const initialRegisterObj = {
        name: '',
        gender: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    
    const [registerObj, setRegisterObj] = useState(initialRegisterObj);
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("")
        if (registerObj.name.trim() === "") return setErrorMessage("Name is required!")
        if (registerObj.gender.trim() === "") return setErrorMessage("Email Id is required!")
        if (registerObj.email.trim() === "") return setErrorMessage("Birthday is required!")
        if (registerObj.password.trim() === "") return setErrorMessage("Password is required!")
        if (registerObj.confirmPassword.trim() === "") return setErrorMessage("ConfirmPassword is required!")
        if (registerObj.confirmPassword !== registerObj.password) return setErrorMessage("Passwords does not match!")
        const res = await dispatch(signup(registerObj));
        await setErrorMessage(res?.payload?.message)
        if (!res?.payload?.error)
            setTimeout(() => {
                navigate('/login');
            }, 500);
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setRegisterObj({ ...registerObj, [updateType]: value })
    }
    return (
        <>
            <form onSubmit={(e) => onSubmit(e)}>
                <InputText labelTitle={"Name:"} defaultValue={registerObj.name} updateType={"name"} updateFormValue={updateFormValue} />
                <InputText labelTitle={"Gender:"} defaultValue={registerObj.gender} updateType={"gender"} updateFormValue={updateFormValue} />
                <InputText labelTitle={"Email:"} defaultValue={registerObj.email} updateType={"email"} updateFormValue={updateFormValue} />
                <InputText labelTitle={"Password:"} defaultValue={registerObj.password} updateType={"password"} updateFormValue={updateFormValue} />
                <InputText labelTitle={"ConfirmPassword:"} defaultValue={registerObj.confirmPassword} updateType={"confirmPassword"} updateFormValue={updateFormValue} />

                <ErrorText>{errorMessage}</ErrorText>
                <button type="submit">Register</button>
                <p>Already Have Account?<Link to="/login">Login</Link></p>
            </form>
        </> 
    );
}
 
export default Register;