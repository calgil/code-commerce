import React from "react";
import s from './Header.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Header = ({ ...props }) => (
        <div className={s.headerBg}>
            <header className={s.header}>
                <h1 className={s.gear}><a href="./">Gear Shop</a></h1>
                <div className={s.links}>
                    <div>
                        <input 
                            className={s.login} 
                            type="button" 
                            value={'Login'}
                            onClick={props.toggleShowSignIn}
                         />
                    </div>
                    <div
                        onClick={props.handleCartClick}
                    >
                        <FontAwesomeIcon
                            className={s.cart}
                            icon={faCartShopping}
                            // onClick={props.handleCartClick}
                         />
                         { props.cartCount
                            ? <span className={s.cartCount}>{props.cartCount}</span>
                            : ''
                         }
                    </div>
                </div>
            </header>
        </div>
)

export default Header;