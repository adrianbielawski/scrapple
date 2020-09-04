import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './newNameForm.scss';
//Custom Components
import Modal from 'components/global_components/modal/modal';
import Button from 'components/global_components/button/button';
import Input from 'components/global_components/input/input';
import LoadingSpinner from 'components/global_components/loading_spinner/LoadingSpinner';
//Redux actions
import { closeNewNameModal } from 'actions/sideMenuActions';
import { setAlert } from 'actions/appActions';

const NewNameForm = (props) => {
    const { t } = useTranslation();
    const [newName, setNewName] = useState(null);
    const newNameInput = useRef(null);
    
    const handleInputChange = () => {
        setNewName(newNameInput.current.value);
    }

    const handleSubmit = () => {
        props.setAlert(
            'confirm',
            'Are you sure you want to change your name to',
            {'newName': newName},
            'change-name',
            {newName}
        );
    }

    return (
        <Modal show={props.show}>
            <div className={styles.newNameForm}>
                <Input
                    className={styles.input}
                    onChange={handleInputChange}
                    placeholder={t("enter new name")}
                    ref={newNameInput}
                />
                {props.isChangingName
                    ? <LoadingSpinner background={false} />
                    : (
                        <Button className={styles.button} onClick={handleSubmit}>
                            {t("Change name")}
                        </Button>
                    )
                }
            </div>
            <Button onClick={props.closeNewNameModal}>{t("Close")}</Button>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        isChangingName: state.auth.isChangingName,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeNewNameModal: () => dispatch(closeNewNameModal()),
        setAlert: (type, messageKey, messageValue, action, alertProps) => dispatch(
            setAlert(type, messageKey, messageValue, action, alertProps)
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNameForm);