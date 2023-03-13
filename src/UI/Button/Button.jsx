import React from 'react';
import styles from './button.module.css'

export default React.memo(function Button({text, onClick, file, isValid, isSend}) {
    return (
        <>
            {
                isSend && <a style={!isValid ? {opacity: '.3', cursor: 'default', pointerEvents: 'none'} : {}}
                             download={'anyName.json'} href={URL.createObjectURL(file)} className={styles.button}
                             onClick={onClick}>{text}</a>
            }
            {
                !isSend && <button onClick={onClick} style={{width:'40%'}} className={styles.button}>{text}</button>
            }
        </>
    );
})
