import React from "react";
import s from './Header.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Header = ({ ...props }) => (
        <div className={s.headerBg}>
            <header className={s.header}>
                <h1 className={s.gear}><a href="./">Gear Shop</a></h1>
                <div className={s.links}>
                    <button
                        onClick={props.handleCartClick}
                        className={s.cart}
                    >
                        <FontAwesomeIcon
                            // className={s.cart}
                            icon={faCartShopping}
                            // onClick={props.handleCartClick}
                         />
                         { props.cartCount
                            ? <span className={s.cartCount}>{props.cartCount}</span>
                            : ''
                         }
                    </button>
                    <button
                        className={s.login}
                        onClick={props.toggleShowSignIn}
                    >
                        Login
                    </button>
                </div>
            </header>
        </div>
)

export default Header;