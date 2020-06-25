import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCopy as faCopyBold } from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const GameId = (props) => {
    const [copy, setCopy] = useState(false);

    const toggleCopy = () => {
        setCopy(!copy)
    };

    return (
        <div className="game-id">
            <p><Trans>Game ID</Trans>: </p>
            <div>
                <p className="id">{props.gameId}</p>
                <p className={`id copy-id ${copy ? 'move' : ''}`}>{props.gameId}</p>
                <CopyToClipboard text={props.gameId}>
                    <span><FontAwesomeIcon icon={copy ? faCopyBold : faCopy}
                        onMouseDown={toggleCopy}
                        onMouseUp={toggleCopy}
                        onTouchStart={toggleCopy}
                        onTouchEnd={toggleCopy} />
                    </span>
                </CopyToClipboard>
            </div>
        </div>
    );
}
 
export default GameId;