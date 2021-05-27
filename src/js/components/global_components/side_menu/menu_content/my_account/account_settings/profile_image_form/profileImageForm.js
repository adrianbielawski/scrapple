import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './profileImageForm.scss';
//Custom Components
import Modal from 'components/global_components/modal/modal';
import Button from 'components/global_components/button/button';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import ImagePreview from './image_preview/imagePreview';
//Redux actions
import { closeProfileImageModal } from 'actions/sideMenuActions';
import { updateProfileImage } from 'actions/authActions';

const ProfileImageForm = (props) => {
    const { t } = useTranslation();
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);

    const handleSelectPhoto = () => {
        fileInputRef.current.click();
    }

    const handleImageChange = (e) => {
        const img = e.target.files[0];
        setImage(img);
    }

    const handleConfirm = () => {
        props.updateProfileImage(image);
    }

    return (
        <Modal show={props.show}>
            <div className={styles.profileImageForm}>
                <ImagePreview image={image} onClick={handleSelectPhoto} />
                <input
                    className={styles.input}
                    type="file"
                    accept="image/png, image/jpeg"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
                <Button className={styles.selectPhotoButton} onClick={handleSelectPhoto}>
                    {props.user.image ? t('Change photo') : t('Select photo')}
                </Button>
                {props.uploadingProfileImage && <LoadingSpinner background={false} />}
            </div>
            <div className={styles.buttons}>
                <Button className={styles.cancelButton} onClick={props.closeProfileImageModal}>{t("Cancel")}</Button>
                <Button onClick={handleConfirm} disabled={!image}>{t("Confirm")}</Button>
            </div>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.app.user,
        uploadingProfileImage: state.auth.uploadingProfileImage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfileImage: (image) => dispatch(updateProfileImage(image)),
        closeProfileImageModal: () => dispatch(closeProfileImageModal()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImageForm);