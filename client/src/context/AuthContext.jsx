import { Auth, useAuth } from "@arcana/auth-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Typography } from "@material-tailwind/react";

const Login = ({ onLoginNavigateTo, heading }) => {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        console.log("auth in Login.js", auth);
        if (auth.isLoggedIn) {
            console.log(auth);
            navigate(onLoginNavigateTo);
        }
    }, [auth, navigate, onLoginNavigateTo]);

    return (
        <>
            {auth.loading && (
                <div className="fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen bg-black bg-opacity-50 backdrop-blur-md">
                    <Spinner color="white" className="w-12 h-12" />
                    <Typography color="white" className="ml-4">
                        Loading...
                    </Typography>
                </div>
            )}
            <div className="min-h-screen bg">
                <h1 className="p-8 text-3xl font-black text-center text-color2">
                    {heading}
                </h1>
                <div>
                    <Auth
                        externalWallet={false}
                        theme="dark"
                        onLogin={() => {
                            navigate(onLoginNavigateTo);
                        }}
                    ></Auth>
                </div>
            </div>
        </>
    );
};

export default Login;
