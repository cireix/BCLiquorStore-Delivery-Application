import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'; 
import axios from 'commons/axios';
import { toast } from 'react-toastify';


export default function Login(props)  {
    const { register, handleSubmit, errors } = useForm();

    const submitHnadler = async (data) => {
        try {
            const { phoneNumber, password } = data;
            // post to server side for login
            const res = await axios.post('/auth/login', { phoneNumber, password });  
            // receive a jwtoken from server side if success
            const jwToken = res.data;
            // store the token locally
            global.auth.setToken(jwToken);  
            // route to the home page
            props.history.push('/');  
            toast.success("Login successful!");
        } catch (error) {
            console.log(error);
            toast.error('Invalid phone number or password');
        }
    };

    return(
        <div className="login_wrapper">
            <form action="" className="box login_box" onSubmit={ handleSubmit(submitHnadler) }>
                <div className="field">
                    <label className="label">Phone Number</label>             
                    <div class="field-body">
                        <div class="field is-expanded">
                            <div class="field has-addons">
                                <p class="control">
                                <a class="button is-static">+1</a>
                                </p>
                                <input 
                                type="text" 
                                className={`input ${errors.phoneNumber && 'is-danger'}`}
                                placeholder="Phone number" 
                                name="phoneNumber"
                                ref={register({
                                    required: true,
                                    pattern:{
                                        value: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
                                        message: "invalid phone number"
                                }})} />  
                            </div>
                            { errors.phoneNumber && <p className="helper has-text-danger">{ errors.phoneNumber.message }</p >}
                        </div>
                    </div>                        
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input 
                        type="text" 
                        className={`input ${errors.password && 'is-danger'}`}
                        placeholder="Password" 
                        name="password"
                        ref={register({
                            required: true,
                            minLength: {
                                value: 6,
                                message: "cannot be less then 6 digits"
                            }})}/>
                        { errors.password && <p className="helper has-text-danger">{ errors.password.message }</p >}
                        <Link to='/forgotpw' className="has-text-danger forgotpw">forgot password?</Link>
                    </div>              
                </div>
                
                   

                <div className="control">
                    <button className="button is-link login_button">Login</button>
                </div>

            </form>         
        </div>
    );
}