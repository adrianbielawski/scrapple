import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './gamesHistory.scss';
//Redux actions
import { setShowGames } from 'actions/sideMenuActions';

const GamesHistory = (props) => {
    const { t } = useTranslation();

    const handleClick = () => {
        props.setShowGames(!props.showGames);
    }

    const getGames = () => {
        return props.userInfo.allGames.map((game, i) => {
            return (
                <tr key={i}>
                    <td className={styles.gameId}>{game.gameId}</td>
                    <td className={styles.date}>{game.date}</td>
                </tr>
            );
        });
    }

    return (
        <div className={styles.gamesHistory}>
            <p className={styles.title} onClick={handleClick}>Games History</p>
            <table className={`${styles.games} ${props.showGames && styles.showGames}`}>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowGames: (showGames) => dispatch(setShowGames(showGames)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesHistory);