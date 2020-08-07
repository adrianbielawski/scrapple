import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCopy as faCopyBold } from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const GameId = (props) => {
    const { t } = useTranslation();
    const [copy, setCopy] = useState(false);

    const toggleCopy = () => {
        setCopy(!copy)
    };

    return (
        <div className="game-id">
            <p>{t("Game ID")}: </p>
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

const mapStateToProps = (state) => {
    return {
      gameId: state.app.gameId,
    }
}

export default connect(mapStateToProps)(GameId);