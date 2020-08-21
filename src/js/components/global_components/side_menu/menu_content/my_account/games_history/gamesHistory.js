import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './gamesHistory.scss';
//Custom Components
import GamesTable from './games_table/gamesTable';
//Redux actions
import { setShowGames } from 'actions/sideMenuActions';

const GamesHistory = (props) => {
    const { t } = useTranslation();

    const handleClick = () => {
        props.setShowGames(!props.showGames);
    }

    return (
        <div className={styles.gamesHistory}>
            <p className={styles.title} onClick={handleClick}>{t("Games history")}</p>
            <div className={`${styles.games} ${props.showGames && styles.showGames}`}>
                <GamesTable />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        showGames: state.sideMenu.showGames,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowGames: (showGames) => dispatch(setShowGames(showGames)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesHistory);