import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './gamesTable.scss';
//Custom Components
import GamesHistoryPagination from '../games_history_pagination/gamesHistoryPagination';
import Button from 'components/global_components/button/button';
import SingleGame from './singleGame';
import Modal from 'components/global_components/modal/modal';
import PlayersSummary from 'components/game_summary/playersSummary';
//Redux actions
import { setGameDetails, fetchGameDetails, setShowGameDetails } from 'actions/sideMenuActions';

const GamesTable = (props) => {
    const { t } = useTranslation();

    const closeModal = () => {
        props.setShowGameDetails(false);
        props.setGameDetails({})
    }

    const getGames = () => {
        const gamesFrom = props.gamesRenderFrom;
        const gamesToRender = props.userInfo.allGames.slice(gamesFrom -1, gamesFrom + 9);
        return gamesToRender.map((game, i) => {
            return (
                <SingleGame key={i} game={game} />
            );
        });
    }

    return (
        <div className={`${styles.gamesTable} ${props.showGames && styles.showGames}`}>
            <Modal show={props.showGameDetails} cardClassName={styles.card}>
                <p className={styles.details}>
                    {t("Played in lang", {'lang': t(props.gameDetails.language)})}
                </p>
                <p className={styles.details}>
                    {props.gameDetails.time ? t("Time limit", {'time': props.gameDetails.time}) : t("No time limit")}
                </p>
                <PlayersSummary players={props.gameDetails.players} />
                <Button onClick={closeModal}>{t("Close")}</Button>
            </Modal>
            <GamesHistoryPagination />
            <table>
                <thead>
                    <tr>
                        <th>{t("Game id")}</th>
                        <th>{t("Date")}</th>
                    </tr>
                </thead>
                <tbody>
                    {getGames()}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.app.userInfo,
        showGames: state.sideMenu.showGames,
        gamesRenderFrom: state.sideMenu.gamesRenderFrom,
        gameDetails: state.sideMenu.gameDetails,
        showGameDetails: state.sideMenu.showGameDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setGameDetails: (gameDetails) => dispatch(setGameDetails(gameDetails)),
        setShowGameDetails: (showGameDetails) => dispatch(setShowGameDetails(showGameDetails)),
        fetchGameDetails: (gameId) => dispatch(fetchGameDetails(gameId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesTable);