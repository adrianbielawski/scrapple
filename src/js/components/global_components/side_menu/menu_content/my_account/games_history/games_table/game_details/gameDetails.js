import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './gameDetails.scss';
//Custom Components
import Button from 'components/global_components/button/button';
import Modal from 'components/global_components/modal/modal';
import PlayersSummary from 'components/game_summary/playersSummary';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
//Redux actions
import { setGameDetails, setShowGameDetails, setFetchingGameDetails } from 'actions/sideMenuActions';

const GameDetails = (props) => {
    const { t } = useTranslation();

    const closeModal = () => {
        props.setShowGameDetails(false);
        props.setGameDetails({});
        props.setFetchingGameDetails(true);
    }

    return (
        <Modal show={props.show} cardClassName={styles.card}>
            {props.fetchingGameDetails ? <LoadingSpinner /> : (
            <div className={styles.wrapper}>
                <p className={styles.details}>
                    {t("Played in lang", {'lang': t(props.gameDetails.language)})}
                </p>
                <p className={styles.details}>
                    {props.gameDetails.time ? t("Time limit", {'time': props.gameDetails.time}) : t("No time limit")}
                </p>
                <PlayersSummary players={props.gameDetails.players} />
                <Button onClick={closeModal}>{t("Close")}</Button>
            </div>
            )}
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        fetchingGameDetails: state.sideMenu.fetchingGameDetails,
        gameDetails: state.sideMenu.gameDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setGameDetails: (gameDetails) => dispatch(setGameDetails(gameDetails)),
        setShowGameDetails: (showGameDetails) => dispatch(setShowGameDetails(showGameDetails)),
        setFetchingGameDetails: (fetchingGameDetails) => dispatch(setFetchingGameDetails(fetchingGameDetails)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails);