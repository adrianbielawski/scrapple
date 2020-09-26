import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './gamesTable.scss';
//Custom Components
import Pagination from 'components/global_components/pagination/Pagination';
import GameRow from './gameRow';
import GameDetails from './game_details/gameDetails';
//Redux actions
import { fetchGamesHistory } from 'actions/sideMenuActions';

const GamesTable = (props) => {
    const { t } = useTranslation();

    useEffect(() => {
        props.fetchGamesHistory(1);
    }, [])

    const getRows = () => {
        return props.gamesHistory.results.map((game, i) => {
            return <GameRow key={i} game={game} />;
        });
    }

    return (
        props.fetchingGamesHistory === false &&
        <div className={`${styles.gamesTable} ${props.showGamesHistory && styles.showGames}`}>
            <GameDetails show={props.showGameDetails} />
            <Pagination
                    data={props.gamesHistory}
                    fetchAction={props.fetchGamesHistory}
                />
            <table>
                <thead>
                    <tr>
                        <th>{t("Game id")}</th>
                        <th>{t("Date")}</th>
                    </tr>
                </thead>
                <tbody>
                    {props.gamesHistory && getRows()}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        showGamesHistory: state.sideMenu.showGamesHistory,
        gamesHistory: state.sideMenu.gamesHistory,
        fetchingGamesHistory: state.sideMenu.fetchingGamesHistory,
        showGameDetails: state.sideMenu.showGameDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGamesHistory: (page) => dispatch(fetchGamesHistory(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesTable);