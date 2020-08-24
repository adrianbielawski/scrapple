import React from 'react';

const Language = (props) => {
    return (
        <div className={props.styles.language} onClick={props.onClick} lang={props.lang.symbol}>
            <img src={props.lang.flag} />
            {props.showName && <p>{props.lang.name}</p>}
        </div>
    );
}

export default Language;