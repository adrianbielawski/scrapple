import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faSlash, faUserCog } from '@fortawesome/free-solid-svg-icons';

const UserIcon = (props) => {
    const player = props.player;
    const admin = player.user.id == props.adminId;

    if (admin) {
        return (
            <div className={props.className}>
                <FontAwesomeIcon icon={faUserCog} />
            </div>
        );
    } else if (player.user.isAnonymous) {
        return (
            <div className={`fa-layers fa-fw ${props.className}`}>
                <FontAwesomeIcon icon={faMobileAlt} />
                <FontAwesomeIcon icon={faSlash} />
            </div>
        );
    }
    return null;
}

const mapStateToProps = (state) => {
    return {
        adminId: state.game.adminId,
    }
}

export default connect(mapStateToProps)(UserIcon);