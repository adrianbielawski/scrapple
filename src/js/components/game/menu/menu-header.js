import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
//Redux Actions
import { toggleShowMenu } from '../../../actions/gameActions';

const MenuHeader = (props) => {
    const { t } = useTranslation();
    return (
        <div className="menu-header">
            <FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={props.toggleShowMenu} />
            <p className="title">{t(props.title)}</p>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleShowMenu: () => { dispatch(toggleShowMenu()) },
  }
}

export default connect(null, mapDispatchToProps)(MenuHeader);