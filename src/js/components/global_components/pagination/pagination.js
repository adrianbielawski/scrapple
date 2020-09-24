import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './pagination.scss';

const Pagination = (props) => {
    const { t } = useTranslation();

    const handlePreviousPage = () => {
        props.fetch.action(props.fetch.playerId, props.data.previous);
    }

    const handleNextPage = () => {
        props.fetch.action(props.fetch.playerId, props.data.next);
    }

    const cx = classNames.bind(styles);
    const chewronL = cx({
        chevron: true,
        inactive: !props.data.next,
    });
    const chewronR = cx({
        chevron: true,
        inactive: !props.data.previous,
    });

    return (
        <div className={styles.pagination}>
            <FontAwesomeIcon
                icon={faChevronLeft}
                className={chewronR}
                onClick={props.data.previous ? handlePreviousPage : null}
            />
            <p>{props.data.startIndex} - {props.data.endIndex}</p>
            <FontAwesomeIcon
                icon={faChevronRight}
                className={chewronL}
                onClick={props.data.next ? handleNextPage : null}
            />
            <p>{t('ofNum', {'count': props.data.count})}</p>
        </div>
    );
}

export default Pagination;