import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

import video from '../../assets/videos/video-1.mp4';
import logoImg from '../../assets/images/logo.png';

const Login = () => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');

    const navigate = useNavigate();

    //login user
    const loginUser = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3002/login', {
            LoginUsername: loginUsername,
            LoginPassword: loginPassword
        }).then((response) => {
            //console.log(response);
            if (response.data.message || loginUsername == '' || loginPassword == '') {
                setLoginStatus(response.data.message);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                navigate('/dashboard');
            }

        });
    };

    useEffect(() => {
        if (loginStatus !== '') {
            setStatusHolder("showMessage");

            setTimeout(() => {
                setStatusHolder("message");
            }, 4000);
        }
    }, [loginStatus]);

    const onSubmit = () => {
        setLoginUsername('');
        setLoginPassword('');
    };

    return (
        <div className='loginPage flex'>
            <div className="container flex">
                <div className="videoDiv">
                    <video src={video} muted autoPlay loop></video>

                    <div className="textDiv">
                        <h2 className="title">
                            Create And Sell Extraordinary Products
                        </h2>
                        <p>Adopt the peace of nature!</p>
                    </div>

                    <div className="footerDiv flex">
                        <span className="text">Don`t have an account?</span>
                        <Link to={'/register'}>
                            <button className='btn'>
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logoImg} alt="logo" />
                        <h3>Welcome Back!</h3>
                    </div>

                    <form className='form grid' onSubmit={onSubmit}>
                        <span className={statusHolder}>
                            {loginStatus}
                        </span>

                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input
                                    type="text"
                                    id="username"
                                    placeholder='Enter Username'
                                    onChange={(event) => setLoginUsername(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder='Enter Password'
                                    onChange={(event) => setLoginPassword(event.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className='btn flex' onClick={loginUser}>
                            <span>Login</span>{" "}
                            <AiOutlineSwapRight className='icon' />
                        </button>

                        <span className="forgotPassword">
                            Forgot your password? <a href="#">Click here</a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
