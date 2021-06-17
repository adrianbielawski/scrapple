import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './pagination.scss';

const Pagination = (props) => {
    const { t } = useTranslation();

    const handlePreviousPage = () => {
        props.fetchAction(props.data.previous, { ...props.params });
    }

    const handleNextPage = () => {
        props.fetchAction(props.data.next, { ...props.params });
    }

    const cx = classNames.bind(styles);
    const chevronL = cx({
        chevron: true,
        inactive: !props.data.next,
    });
    const chevronR = cx({
        chevron: true,
        inactive: !props.data.previous,
    });

    return (
        <div className={styles.pagination} data-automation="pagination">
            <FontAwesomeIcon
                icon={faChevronLeft}
                className={chevronR}
                onClick={props.data.previous ? handlePreviousPage : null}
                data-automation="chevronLeft"
            />
            <p>{props.data.startIndex} - {props.data.endIndex}</p>
            <FontAwesomeIcon
                icon={faChevronRight}
                className={chevronL}
                onClick={props.data.next ? handleNextPage : null}
                data-automation="chevronRight"
            />
            <p data-automation="number">{t('ofNum', {'count': props.data.count})}</p>
        </div>
    );
}

export default Pagination;