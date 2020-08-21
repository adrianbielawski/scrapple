import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './changeName.scss';
//Custom Components
import Modal from 'components/global_components/modal/modal';
import Button from 'components/global_components/button/button';
//Redux actions
import { setShowChangeNameModal } from 'actions/sideMenuActions';

const ChangeName = (props) => {
    const { t } = useTranslation();
  
    const closeModal = () => {
        props.setShowChangeNameModal(!props.showChangeNameModal);
    }

    return (
        <Modal show={props.showChangeNameModal}>
            <Button onClick={closeModal}>{t("Close")}</Button>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        showChangeNameModal: state.sideMenu.showChangeNameModal,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowChangeNameModal: (showChangeNameModal) => dispatch(setShowChangeNameModal(showChangeNameModal)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeName);