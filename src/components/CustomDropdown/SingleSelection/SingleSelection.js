import React, { useState } from 'react'
import styles from './SingleSelection.module.css'
import { optionsData } from '../../../utils/data';


const SingleSelection = ({ options }) => {
    // const options = optionsData;
    const [selection, setSelection] = useState('Maharashtra');
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data.get('IndianStates'));
        setSelection(data.get('IndianStates'));
    }
    return (
        <div>


            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="IndianStates" className={styles.label}>
                    <div className={styles.title}>Indian States</div>
                    <select name="IndianStates" id="IndianStates" className={styles.select}>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <input type="submit" value="Submit" className={styles.submit} />
                <div className={styles.selection}>Selection: <b>{selection}</b> </div>
            </form>
        </div>
    )
}

export default SingleSelection


{/* <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="TamilNadu">TamilNadu</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option> */}