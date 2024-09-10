import { useState } from "react";
import { useDispatch } from "react-redux"
import InputText from "../utils/InputText";
import ErrorText from './../utils/ErrorText';
import { signin } from './../redux/userSlice';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const initialLoginrObj = {
        email: '',
        password: '',
    }
    
    const [loginObj, setLoginObj] = useState(initialLoginrObj);
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("")
        if (loginObj.email.trim() === "") return setErrorMessage("Birthday is required!")
        if (loginObj.password.trim() === "") return setErrorMessage("Password is required!")
        const res = await dispatch(signin(loginObj));
        await setErrorMessage(res?.payload?.message)
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLoginObj({ ...loginObj, [updateType]: value })
    }
    return (
        <>
            <form onSubmit={(e) => onSubmit(e)}>
                <InputText labelTitle={"Email:"} defaultValue={loginObj.email} updateType={"email"} updateFormValue={updateFormValue} />
                <InputText labelTitle={"Password:"} defaultValue={loginObj.password} updateType={"password"} updateFormValue={updateFormValue} />

                <ErrorText>{errorMessage}</ErrorText>
                <button type="submit">Login</button>
            </form>
        </> 
    );
}
 
export default Login;