import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './newNameForm.scss';
//Custom Components
import Modal from 'components/global_components/modal/modal';
import Button from 'components/global_components/button/button';
import Input from 'components/global_components/input/input';
//Redux actions
import { setShowChangeNameModal } from 'actions/sideMenuActions';
import { setAlert } from 'actions/appActions';

const NewNameForm = (props) => {
    const { t } = useTranslation();
    const [newName, setNewName] = useState(null);
    const newNameInput = useRef(null);
    
    const handleInputChange = () => {
        setNewName(newNameInput.current.value);
    }

    const closeModal = () => {
        props.setShowChangeNameModal(false);
    }

    const handleSubmit = () => {
        props.setAlert('confirm', 'Are you sure you want to change your name to', {'newName': newName}, 'change-name', newName);
        newNameInput.current.value = null;
        setNewName(null);
    }

    return (
        <Modal show={props.show}>
            <div className={styles.newNameForm}>
                <Input className={styles.input} onChange={handleInputChange} placeholder={t("enter new name")} ref={newNameInput}/>
                <Button className={styles.button} onClick={handleSubmit}>{t("Change name")}</Button>
            </div>
            <Button onClick={closeModal}>{t("Close")}</Button>
        </Modal>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowChangeNameModal: (showChangeNameModal) => dispatch(setShowChangeNameModal(showChangeNameModal)),
        setAlert: (type, messageKey, messageValue, action, alertProps) => dispatch(setAlert(type, messageKey, messageValue, action, alertProps)),
    }
}

export default connect(null, mapDispatchToProps)(NewNameForm);