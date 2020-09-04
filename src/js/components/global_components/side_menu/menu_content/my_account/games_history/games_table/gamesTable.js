import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './gamesTable.scss';
//Custom Components
import GamesHistoryPagination from '../games_history_pagination/gamesHistoryPagination';
import GameRow from './gameRow';
import GameDetails from './game_details/gameDetails';
//Redux actions
import { fetchGamesHistory } from 'actions/sideMenuActions';

const GamesTable = (props) => {
    const { t } = useTranslation();

    useEffect(() => {
        props.fetchGamesHistory(1);
    }, [])

    const getGames = () => {
        return props.gamesHistory.results.map((game, i) => {
            return (
                <GameRow key={i} game={game} />
            );
        });
    }

    return (
        props.fetchingGamesHistory === false &&
        <div className={`${styles.gamesTable} ${props.showGamesHistory && styles.showGames}`}>
            {/*
            TO DO

            <GameDetails show={props.showGameDetails} />*/}
            <GamesHistoryPagination />
            <table>
                <thead>
                    <tr>
                        <th>{t("Game id")}</th>
                        <th>{t("Date")}</th>
                    </tr>
                </thead>
                <tbody>
                    {props.gamesHistory && getGames()}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        showGamesHistory: state.sideMenu.showGamesHistory,
        gamesHistory: state.sideMenu.gamesHistory,
        showGameDetails: state.sideMenu.showGameDetails,
        fetchingGamesHistory: state.sideMenu.fetchingGamesHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGamesHistory: (page) => dispatch(fetchGamesHistory(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesTable);