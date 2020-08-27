import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './gamesTable.scss';
//Custom Components
import GamesHistoryPagination from '../games_history_pagination/gamesHistoryPagination';
import SingleGame from './singleGame';
import GameDetails from './game_details/gameDetails';
//Redux actions

const GamesTable = (props) => {
    const { t } = useTranslation();

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
        <div className={`${styles.gamesTable} ${props.showGamesHistory && styles.showGames}`}>
            <GameDetails show={props.showGameDetails} />
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
        showGamesHistory: state.sideMenu.showGamesHistory,
        gamesRenderFrom: state.sideMenu.gamesRenderFrom,
        gameDetails: state.sideMenu.gameDetails,
        showGameDetails: state.sideMenu.showGameDetails,
    }
}

export default connect(mapStateToProps)(GamesTable);