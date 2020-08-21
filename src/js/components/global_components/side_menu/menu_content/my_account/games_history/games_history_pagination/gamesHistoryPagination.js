import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './gamesHistoryPagination.scss';
//Redux actions
import { decreaseGamesToRender, increaseGamesToRender } from 'actions/sideMenuActions';

const GamesHistoryPagination = (props) => {
    const { t } = useTranslation();

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

    return (
        <div className={styles.pagination}>
            <FontAwesomeIcon icon={faChevronLeft} className={styles.chevron} onClick={handleDecrease} />
            <p>{props.gamesRenderFrom} - {getGamesRenderTo()}</p>
            <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} onClick={handleIncrease} />
            <p>{t('fromNum', {'allGames': props.userInfo.allGames.length})}</p>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.app.userInfo,
        gamesRenderFrom: state.sideMenu.gamesRenderFrom,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        decreaseGamesToRender: () => dispatch(decreaseGamesToRender()),
        increaseGamesToRender: () => dispatch(increaseGamesToRender()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesHistoryPagination);