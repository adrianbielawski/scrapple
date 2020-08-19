import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './gamesHistory.scss';
//Redux actions
import { setShowGames, decreaseGamesToRender, increaseGamesToRender } from 'actions/sideMenuActions';

const GamesHistory = (props) => {
    const { t } = useTranslation();

    const handleClick = () => {
        props.setShowGames(!props.showGames);
    }

    const handleDecrease = () => {
        if (props.gamesRenderFrom === 1) {
            return
        }
        props.decreaseGamesToRender();
    }

    const handleIncrease = () => {
        if (props.gamesRenderFrom > props.userInfo.allGames.length - 10) {
            return
        }
        props.increaseGamesToRender();
    }

    const getGamesRenderTo = () => {
        let gamesRenderTo = props.gamesRenderFrom + 9
        if (props.gamesRenderFrom + 10 > props.userInfo.allGames.length) {
            gamesRenderTo = props.userInfo.allGames.length
        }
        return gamesRenderTo
    }

    const getGames = () => {
        const gamesFrom = props.gamesRenderFrom;
        const gamesToRender = props.userInfo.allGames.slice(gamesFrom -1, gamesFrom + 9);
        return gamesToRender.map((game, i) => {
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
            <p className={styles.title} onClick={handleClick}>{t("Games history")}</p>
            <div className={`${styles.games} ${props.showGames && styles.showGames}`}>
                <div className={styles.gamesToRender}>
                    <FontAwesomeIcon icon={faChevronLeft} className={styles.chevron} onClick={handleDecrease} />
                    <p>{props.gamesRenderFrom} - {getGamesRenderTo()}</p>
                    <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} onClick={handleIncrease} />
                    <p>{t('fromNum', {'allGames': props.userInfo.allGames.length})}</p>
                </div>
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
        setShowGames: (showGames) => dispatch(setShowGames(showGames)),
        decreaseGamesToRender: () => dispatch(decreaseGamesToRender()),
        increaseGamesToRender: () => dispatch(increaseGamesToRender()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesHistory);