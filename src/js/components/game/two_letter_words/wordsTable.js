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
    const [startMove, setStartMove] = useState({x: 0, y: 0});
    const [translate, setTranslate] = useState({x: 0, y: 0});
    const [maxTranslateX, setMaxTranslateX] = useState(null);
    const [maxTranslateY, setMaxTranslateY] = useState(null);
    const [minTranslateX, setMinTranslateX] = useState(null);
    const [minTranslateY, setMinTranslateY] = useState(null);

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
    
    const handleTouchStart = useCallback((e) => {
        if (e.touches.length === 1) {
            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;

            setStartMove({x, y});
            const tableWrapperD = tableWrapper.current.getBoundingClientRect();
            const tableD = table.current.getBoundingClientRect();

            const maxX = tableWrapperD.x - tableD.x + translate.x + 5;
            const maxY = tableWrapperD.y - tableD.y + translate.y + 5;
            const minX = tableWrapperD.x + tableWrapperD.width - tableD.x - tableD.width + translate.x - 5;
            const minY = tableWrapperD.y + tableWrapperD.height - tableD.y - tableD.height + translate.y - 5;
            setMaxTranslateX(maxX);
            setMaxTranslateY(maxY);
            setMinTranslateX(minX);
            setMinTranslateY(minY);
        }
    })

    const handleTouchMove = useCallback((e) => {
        if (e.touches.length === 1 && scale > 1 && startMove) {

            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;

            let newTranslateX = x - startMove.x + translate.x;
            let newTranslateY = y - startMove.y + translate.y;

            if (newTranslateX >= maxTranslateX) {
                newTranslateX = maxTranslateX
            }

            if (newTranslateY >= maxTranslateY) {
                newTranslateY = maxTranslateY
            }

            if (newTranslateX <= minTranslateX) {
                newTranslateX = minTranslateX
            }

            if (newTranslateY <= minTranslateY) {
                newTranslateY = minTranslateY
            }

            setTranslate({x: newTranslateX, y: newTranslateY})
        }

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

            if (midPointX <= -5) {
                midPointX = -5;
            }

            if (midPointY <= -5) {
                midPointY = -5;
            }

            if (midPointX >= tableWrapperD.width - 10) {
                midPointX = tableWrapperD.width - 10;
            }

            if (midPointY >= tableWrapperD.height - 10) {
                midPointY = tableWrapperD.height - 10;
            }

            table.current.style.transformOrigin = `${midPointX}px ${midPointY}px`;
            setScale(_scale)
            if (_scale <= 1) {
                setTranslate({x: 0, y: 0})
            }
        }
    }, [startDistance, startMove, scale])

    const handleTouchEnd = useCallback((e) => {
        setStartDistance(null);
        setStartScale(scale);
        setStartMove(null);
        const tableWrapperD = tableWrapper.current.getBoundingClientRect();
        const tableD = table.current.getBoundingClientRect();

        const maxX = tableWrapperD.x - tableD.x + translate.x + 5;
        const maxY = tableWrapperD.y - tableD.y + translate.y + 5;
        const minX = tableWrapperD.x + tableWrapperD.width - tableD.x - tableD.width + translate.x - 5;
        const minY = tableWrapperD.y + tableWrapperD.height - tableD.y - tableD.height + translate.y - 5;
        setMaxTranslateX(maxX);
        setMaxTranslateY(maxY);
        setMinTranslateX(minX);
        setMinTranslateY(minY);
    }, [scale])

    let wordsClass = props.showWords ? styles.active : '';

    return (
        <div className={`${styles.words} ${wordsClass}`} ref={tableWrapper}>
            <table className={styles.wordsTable}
                style={{transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`}}
                onTouchStart={handleTouchStart}
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