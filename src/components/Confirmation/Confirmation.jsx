import React from "react";
import s from "./Confirmation.module.css";
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputBase from "../InputBase/InputBase";

const Confirmation = ({...props}) => (
    <div className={s.confirmationContainer}>
        <h3>Confirmation</h3>
        <FontAwesomeIcon 
            icon={faThumbsUp}
            className={s.thumbsUp}
        />
        <h4 className={s.success}>
            Congratulations. <br />
            Your order is accepted.
        </h4>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eveniet dignissimos omnis nam dicta facere amet. Obcaecati id mollitia ratione, eligendi commodi nemo hic totam repellendus eaque, pariatur possimus aperiam?
        </p>
        <InputBase 
            type="submit"
            value='Track Order'
            className={`${s.confirmBtn} ${s.track}`}
        />
        <InputBase 
            type="submit"
            value='Back to Home Page'
            className={`${s.confirmBtn} ${s.backToHome}`}
            onClick={props.reset}
        />
    </div>
)

export default Confirmation;