import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './gamesHistoryPagination.scss';
//Redux actions
import { fetchGamesHistory } from 'actions/sideMenuActions';

const GamesHistoryPagination = (props) => {
    const { t } = useTranslation();
    let results = {
        from: props.gamesHistory.startIndex,
        to: props.gamesHistory.endIndex,
    };

    const handlePreviousPage = () => {
        props.fetchGamesHistory(props.gamesHistory.previous);
    }

    const handleNextPage = () => {
        props.fetchGamesHistory(props.gamesHistory.next);
    }

    return (
        <div className={styles.pagination}>
            <FontAwesomeIcon
                icon={faChevronLeft}
                className={`${styles.chevron} ${!props.gamesHistory.previous ? styles.inactive : ''}`}
                onClick={props.gamesHistory.previous ? handlePreviousPage : null}
            />
            <p>{results.from} - {results.to}</p>
            <FontAwesomeIcon
                icon={faChevronRight}
                className={`${styles.chevron} ${!props.gamesHistory.next ? styles.inactive : ''}`}
                onClick={props.gamesHistory.next ? handleNextPage : null}
            />
            <p>{t('ofNum', {'allGames': props.gamesHistory.count})}</p>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        gamesHistory: state.sideMenu.gamesHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGamesHistory: (page) => dispatch(fetchGamesHistory(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesHistoryPagination);