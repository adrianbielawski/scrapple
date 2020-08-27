import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './changeProfileImage.scss';
//Custom Components
import Modal from 'components/global_components/modal/modal';
import Button from 'components/global_components/button/button';
import Input from 'components/global_components/input/input';
//Redux actions
import { setShowChangeProfileImageModal } from 'actions/sideMenuActions';

const ChangeProfileImage = (props) => {
    const { t } = useTranslation();

    const closeModal = () => {
        props.setShowChangeProfileImageModal(false);
    }

    return (
        <Modal show={props.show}>

            <Button onClick={closeModal}>{t("Close")}</Button>
        </Modal>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowChangeProfileImageModal: (showChangeProfileImageModal) => dispatch(setShowChangeProfileImageModal(showChangeProfileImageModal)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProfileImage);