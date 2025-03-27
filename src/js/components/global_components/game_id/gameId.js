import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./gameId.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faCopy as faCopyBold } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

const GameId = () => {
  const { t } = useTranslation();
  const { gameId } = useParams(null);
  const [copy, setCopy] = useState(false);

  const toggleCopy = () => {
    setCopy(!copy);
  };

  return (
    <div className={styles.gameId}>
      <p>{t("Game ID")}: </p>
      <div>
        <p className={styles.id}>{gameId}</p>
        <p
          className={`${styles.id} ${styles.copyId} ${copy ? styles.move : ""}`}
        >
          {gameId}
        </p>
        <CopyToClipboard text={gameId}>
          <span>
            <FontAwesomeIcon
              icon={copy ? faCopyBold : faCopy}
              onMouseDown={toggleCopy}
              onMouseUp={toggleCopy}
              onTouchStart={toggleCopy}
              onTouchEnd={toggleCopy}
            />
          </span>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default GameId;
