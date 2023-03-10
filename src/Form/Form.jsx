import React, {useEffect, useRef, useState} from 'react';
import {Input} from "../UI/Input";
import {Button} from "../UI/Button";
import styles from './form.module.css';
import {sendForm} from "../utils/sendForm";
import {clear} from "@testing-library/user-event/dist/clear";

export function Form({setIsOpenForm}) {
    const [valueName, setValueName] = useState('')
    const [valueNumber, setValueNumber] = useState('')
    const [valueText, setValueText] = useState('')
    const [dataSend, setDataSend] = useState(new Blob([JSON.stringify('noData')],{type: 'application/json'}))
    const [validName, setValidName] = useState(true)
    const [validTel, setValidTel] = useState(true)
    const [validText, setValidText] = useState(true)
    const [touchedName, setTouchedName] = useState(false)
    const [touchedTel, setTouchedTel] = useState(false)
    const [touchedText, setTouchedText] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [successfullySent, setSuccessfullySent] = useState(false)
    const [faultSent, setFaultSent] = useState(false)
    const refForm = useRef(null)
    const outFormClick = (event) => {
        if (!refForm.current?.contains(event.target)) {
            setIsOpenForm(false)
        }
    }
    const onChangeName = (e) => {
        setTouchedName(true)
        if (e.target.value.length > 2 && /^[a-zA-ZА-Яа-я]+$/.test(e.target.value)) {
            setValidName(true)
        } else {
            setValidName(false)
        }
        setValueName(e.target.value)
    }
    const onChangeNumber = (e) => {
        setTouchedTel(true)
        if (e.target.value.replace(/[+()_-]/g, '').length === 11) {
            setValidTel(true)
        } else {
            setValidTel(false)
        }
        setValueNumber(e.target.value)
    }
    const onChangeText = (e) => {
        setTouchedText(true)
        if (e.target.value.length > 1) {
            setValidText(true)
        } else {
            setValidText(false)
        }
        setValueText(e.target.value)
    }

    const submit = () => {
        setDataSend(sendForm(valueName,valueNumber,valueText))
        setValueText('')
        setValueNumber('')
        setValueName('')
        setTouchedName(false)
        setTouchedTel(false)
        setTouchedText(false)
        setSuccessfullySent(true)
    }

    useEffect(() => {
        if(touchedName && touchedTel && touchedText && validTel && validName && validText) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    },[touchedText,touchedName,touchedTel,validName,validText,validTel])
    useEffect(() => {
           document.addEventListener('click', outFormClick)
           return () => {
               document.removeEventListener('click', outFormClick)
       }
    })
    useEffect(() => {
        const timer = setTimeout(()=>{
            setSuccessfullySent(false)
            setFaultSent(false)
        },2000)
        return () => clearTimeout(timer)
    }, [successfullySent]);



    return (
        <form ref={refForm} className={styles.form}>
            {
              successfullySent &&  <span className={styles.sucMessage}>Данные успешно отправлены</span>
            }
            {
                faultSent && <span className={styles.faultMessage}>Ошибка при отправке данных</span>
            }
            <Input isTouched={touchedName} isValid={validName} placeholder={'Имя'} type={'text'} onChange={onChangeName} value={valueName}/>
            <Input isTouched={touchedTel} isValid={validTel} placeholder={'Телефон'} isMask={true} type={'tel'} onChange={onChangeNumber} value={valueNumber}/>
            <Input isTextArea={true} isTouched={touchedText} isValid={validText} placeholder={'Ваше сообщение'} type={'text'} onChange={onChangeText} value={valueText}/>
            <Button isSend={true} isValid={isValid} onClick={submit} text={"Отправить"} file={dataSend}/>
        </form>
    );
}
