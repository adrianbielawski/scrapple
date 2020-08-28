import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styles from './changeProfileImage.scss';
//Custom Components
import Modal from 'components/global_components/modal/modal';
import Button from 'components/global_components/button/button';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import ImagePreview from './image_preview/imagePreview';
//Redux actions
import { setShowChangeProfileImageModal, updateProfileImage } from 'actions/sideMenuActions';
import { setAlert } from 'actions/appActions';

const ChangeProfileImage = (props) => {
    const { t } = useTranslation();
    const [uploadingImage, setUploadingImage] = useState(false);
    const { gameId } = useParams();
    const fileInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageURL, setProfileImageURL] = useState(null);

    const handleSelectPhoto = () => {
        fileInputRef.current.click();
    }

    const handleImageChange = (e) => {
        const img = e.target.files[0];
        setProfileImage(img);
        setProfileImageURL(URL.createObjectURL(img));
    }

    const handleConfirm = () => {
        setUploadingImage(true);
        const updatePromise = props.updateProfileImage(profileImage, gameId, props.user.uid, props.players);
        updatePromise.then(() => {
            setUploadingImage(false);
        });
    }

    const closeModal = () => {
        setProfileImageURL(null);
        props.setShowChangeProfileImageModal(false);
    }

    return (
        <Modal show={props.show}>
            <div className={styles.changeProfileImage}>
                <ImagePreview profileImageURL={profileImageURL} user={props.user} onClick={handleSelectPhoto} />
                <input className={styles.input} type="file" accept="image/png, image/jpeg" capture="user" ref={fileInputRef} onChange={handleImageChange} />
                <Button className={styles.selectPhotoButton} onClick={handleSelectPhoto}>
                    {props.user.photoURL ? t('Change photo') : t('Select photo')}
                </Button>
                {uploadingImage && <LoadingSpinner background={false} />}
            </div>
            <div className={styles.buttons}>
                <Button className={styles.cancelButton} onClick={closeModal}>{t("Cancel")}</Button>
                <Button onClick={handleConfirm}>{t("Confirm")}</Button>
            </div>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.app.user,
        players: state.game.players,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfileImage: (profileImage, gameId, uid, players) => dispatch(updateProfileImage(profileImage, gameId, uid, players)),
        setAlert: (type, messageKey, messageValue, action, props) => dispatch(setAlert(type, messageKey, messageValue, action, props)),
        setShowChangeProfileImageModal: (showChangeProfileImageModal) => dispatch(setShowChangeProfileImageModal(showChangeProfileImageModal)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProfileImage);