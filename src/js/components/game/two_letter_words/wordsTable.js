import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { words } from './words.js';
import styles from './wordsTable.scss';

const WordsTable = (props) => {
    const tableWrapper = useRef(null);
    const table = useRef(null);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [startDistance, setStartDistance] = useState(null);
    const [startScale, setStartScale] = useState(1);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        let _rows = new Set();
        let _columns = new Set();

        for (const word of words[props.language]) {
            _rows.add(word[0]);
            _columns.add(word[1]);
        }

        const sortFunction = (a, b) => a.localeCompare(b)
        _rows = Array.from(_rows).sort(sortFunction);
        _columns = Array.from(_columns).sort(sortFunction);

        setRows(_rows);
        setColumns(_columns);
    }, [])

    const handleTouchMove = useCallback((e) => {
        if (e.touches.length === 2) {
            const distance = Math.sqrt(
                Math.pow(
                    Math.abs(e.touches[0].clientX - e.touches[1].clientX), 2) +
                Math.pow(
                    Math.abs(e.touches[0].clientY - e.touches[1].clientY), 2)
            );

            if (startDistance === null) {
                setStartDistance(distance);
                return;
            }

            let _scale = startScale * distance / startDistance;
            if (_scale < 1) {
                _scale = 1;
            }
            if (_scale > 3) {
                _scale = 3;
            }
            const tableWrapperD = tableWrapper.current.getBoundingClientRect();
            const tableWrapperX = tableWrapperD.left;
            const tableWrapperY = tableWrapperD.top;

            const midPointX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - tableWrapperX;
            const midPointY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - tableWrapperY;

            table.current.style.transformOrigin = `${midPointX}px ${midPointY}px`;
            setScale(_scale)
        }
    }, [startDistance])

    const handleTouchEnd = useCallback((e) => {
        setStartDistance(null);
        setStartScale(scale);
    }, [scale])

    let wordsClass = props.showWords ? styles.active : '';

    return (
        <div className={`${styles.words} ${wordsClass}`} ref={tableWrapper}>
            <table className={styles.wordsTable}
                style={{transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`}}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                ref={table}
            >
                <thead>
                    <tr>
                        <th></th>
                        {columns.map((c, i) => <th key={i}>{c}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i}>
                            <th>{r}</th>
                            {columns.map((c, i) => (
                                <td key={i}>
                                    {words[props.language].includes(`${r}${c}`) && `${r}${c}`}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        showWords: state.game.showWords,
    }
}

export default connect(mapStateToProps)(WordsTable);