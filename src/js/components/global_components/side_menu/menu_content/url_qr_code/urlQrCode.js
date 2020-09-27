import React from 'react';
import { connect } from 'react-redux';
import styles from './urlQrCode.scss'

const BASE_URL = 'http://192.168.1.10:8000';

const UrlQrCode = (props) => {
    return (
        <div className={styles.urlQrCode}>
            <img src={`${BASE_URL}/games/${props.gameId}/qr.svg`}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        gameId: state.gamePage.gameData.id,
    }
}

export default connect(mapStateToProps)(UrlQrCode);