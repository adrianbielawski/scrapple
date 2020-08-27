import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './gamesHistory.scss';
//Custom Components
import GamesTable from './games_table/gamesTable';
//Redux actions
import { setShowGamesHistory } from 'actions/sideMenuActions';

const GamesHistory = (props) => {
    const { t } = useTranslation();

    const handleClick = () => {
        props.setShowGamesHistory(!props.showGamesHistory);
    }

    return (
        <div className={styles.gamesHistory}>
            <p className={styles.title} onClick={handleClick}>{t("Games history")}</p>
            <GamesTable />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        showGamesHistory: state.sideMenu.showGamesHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowGamesHistory: (showGamesHistory) => dispatch(setShowGamesHistory(showGamesHistory)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesHistory);