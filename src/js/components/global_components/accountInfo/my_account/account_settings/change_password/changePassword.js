import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './changePassword.scss';
//Custom Components
import Modal from 'components/global_components/modal/modal';
import Button from 'components/global_components/button/button';
//Redux actions
import { setShowChangePasswordModal } from 'actions/sideMenuActions';

const ChangePassword = (props) => {
    const { t } = useTranslation();

    const closeModal = () => {
        props.setShowChangePasswordModal(!props.showChangePasswordModal);
    }

    return (
        <Modal show={props.showChangePasswordModal}>
            <Button onClick={closeModal}>{t("Close")}</Button>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        showChangePasswordModal: state.sideMenu.showChangePasswordModal,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowChangePasswordModal: (showChangePasswordModal) => dispatch(setShowChangePasswordModal(showChangePasswordModal)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);