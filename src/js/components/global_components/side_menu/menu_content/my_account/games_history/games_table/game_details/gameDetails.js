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
import { closeGameDetails } from 'actions/sideMenuActions';

const TIME_FORMAT = 'HH:mm:ss';

const GameDetails = (props) => {
    const { t } = useTranslation();

    return (
        <Modal show={props.show} cardClassName={styles.card}>
            {!props.gameDetails ? <LoadingSpinner /> : (
            <div className={styles.wrapper}>
                <p className={styles.details}>
                    {t("Played in lang", {'lang': t(props.gameDetails.language)})}
                </p>
                <p className={styles.details}>
                    {props.gameDetails.timeLimit
                        ? t("Time limit", {'time': props.gameDetails.timeLimit.format(TIME_FORMAT)})
                        : t("No time limit")
                    }
                </p>
                <PlayersSummary players={props.gameDetails.players} />
                <Button onClick={props.closeGameDetails}>{t("Close")}</Button>
            </div>
            )}
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        gameDetails: state.sideMenu.gameDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeGameDetails: () => dispatch(closeGameDetails()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails);