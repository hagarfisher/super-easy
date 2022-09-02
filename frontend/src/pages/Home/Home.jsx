import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import styles from './style.module.scss';

export default function Home({ createCart }) {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    function handleClick() {
        createCart();
        navigate("/lists");
    }

    if (isLoading) return <Spinner />;
    return (
        <div className={styles.home}>
            {isAuthenticated ? <div className={styles.carrots}>
                <Button onClick={(e) => handleClick()}>Start shopping</Button>
            </div>
                :
                <Button className={styles['login-button']} onClick={() => navigate("/login")}>Login</Button>

            }
        </div>
    )
}
