import React from 'react';
import styles from './input.module.css';
import InputMask from 'react-input-mask';


export function Input({type, value, onChange, isMask, placeholder, isValid, isTouched}) {
    return (
        <div className={styles.blockInput}>
            {
                isMask && <InputMask onBlur={onChange} style={ !isValid? {borderBottomColor: 'red'}:{} } onChange={onChange} value={value} tyte={'tel'} className={styles.input}
                                     mask='+7(999)999-99-99'></InputMask>
            }

            {
                !isMask &&
                <input onFocus={onChange} style={ !isValid? {borderBottomColor: 'red'}:{} } formNoValidate={false} onChange={event => onChange(event)} className={styles.input} type={type} value={value}/>
            }
            <span style={isTouched? {top: '0'} : {} } className={styles.placeholder}>{placeholder}</span>
        </div>
    )
}
