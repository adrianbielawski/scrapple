import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { words } from './words.js';
import styles from './wordsTable.scss';

const WordsTable = (props) => {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    
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


    return (
        <table className={styles.wordsTable}>
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
    )
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    }
}

export default connect(mapStateToProps)(WordsTable);