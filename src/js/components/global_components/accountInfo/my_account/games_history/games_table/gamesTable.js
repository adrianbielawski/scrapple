import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './gamesTable.scss';
//Custom Components
import GamesHistoryPagination from '../games_history_pagination/gamesHistoryPagination';
//Redux actions
import { setGameDetails, fetchGameDetails } from 'actions/sideMenuActions';
import SingleGame from './singleGame';

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
        <div className={`${styles.gamesTable} ${props.showGames && styles.showGames}`}>
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
        userInfo: state.sideMenu.userInfo,
        showGames: state.sideMenu.showGames,
        gamesRenderFrom: state.sideMenu.gamesRenderFrom,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setGameDetails: (gameDetails) => dispatch(setGameDetails(gameDetails)),
        fetchGameDetails: (gameId) => dispatch(fetchGameDetails(gameId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesTable);