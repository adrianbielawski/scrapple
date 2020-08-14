import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './menuHeader.scss';
//Redux Actions
import { toggleShowMenu } from 'actions/gameActions';

const MenuHeader = (props) => {
    const { t } = useTranslation();
    return (
        <div className={styles.menuHeader}>
            <FontAwesomeIcon icon={faArrowLeft} className={styles.arrow} onClick={props.toggleShowMenu} />
            <p className={styles.title}>{t(props.title)}</p>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleShowMenu: () => { dispatch(toggleShowMenu()) },
  }
}

export default connect(null, mapDispatchToProps)(MenuHeader);