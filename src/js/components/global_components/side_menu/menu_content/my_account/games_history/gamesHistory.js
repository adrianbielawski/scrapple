import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './gamesHistory.scss';
//Custom Components
import GamesTable from './games_table/gamesTable';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
//Redux actions
import { setShowGamesHistory, fetchGamesHistory } from 'actions/sideMenuActions';

const GamesHistory = (props) => {
    const { t } = useTranslation();
    const [showSpinner, setShowSpinner] = useState(false);

    const handleClick = () => {
        if (props.fetchingGamesHistory) {
            setShowSpinner(true);
            const userInfoPromise = props.fetchGamesHistory(props.user.uid);
            userInfoPromise.then(() => {
                setTimeout(() => props.setShowGamesHistory(!props.showGamesHistory), 10);
                setShowSpinner(false);
            })
        } else {
            props.setShowGamesHistory(!props.showGamesHistory);
        }
    }

    return (
        <div className={styles.gamesHistory}>
            <div className={styles.title}>
                <p onClick={handleClick}>{t("Games history")}</p>
                {showSpinner && <LoadingSpinner size={20} />}
            </div>
            <GamesTable />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        fetchingGamesHistory: state.sideMenu.fetchingGamesHistory,
        user: state.app.user,
        showGamesHistory: state.sideMenu.showGamesHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShowGamesHistory: (showGamesHistory) => dispatch(setShowGamesHistory(showGamesHistory)),
        fetchGamesHistory: (uid) => dispatch(fetchGamesHistory(uid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesHistory);