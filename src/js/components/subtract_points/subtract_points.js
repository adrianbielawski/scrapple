import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import db from '../../../firebase';
import '../../../styles/game-summary.scss';
//Custom Components
import PlayerSubPoints from '../subtract_points/player-subtract-points';
import Header from '../global_components/header';
import LoadingSpinner from '../global_components/loadingSpinner';

const SubtractPoints = (props) => {
    const { t } = useTranslation();
    const [gameId, setGameId] = useState(null);
    const [players, setPlayers] = useState(null);
    const [fetching, setFetching] = useState(true);
    

    useEffect(() => {
        const pathArray = window.location.pathname.split('/');
        const id = pathArray[2];
        setGameId(id);

        db.collection('games').doc(id).get()
        .then((response) => {
            const data = response.data();
            setPlayers(data.players);
            setFetching(false)
        })
        .catch(() => {
            this.alert('alert', 'Something went wrong, please check your internet connection and try again');
        });;
    }, []);

    const validateUserInputs = (e) => {
        for (let i = 0; i < players.length; i++) {
            const inputVal = document.getElementById(`sub-points${i}`).value;
            inputVal = parseFloat(inputVal);
            if(!inputVal) {
                inputVal = 0
            }
            if (inputVal < 0 || !Number.isInteger(inputVal)) {
                const messageKey = 'Points value must be positive integer';
                props.alert('alert', messageKey);
                return
            };
        };
        subPoints(e);
    };

    const subPoints = (e) => {
        e.preventDefault();
        const p = [ ...players ];
        p.map((player, index) => {
            const inputVal = document.getElementById(`sub-points${index}`).value;
            let newPlayer = player;
            newPlayer.currentScore -= inputVal;
            newPlayer.subtractedPoints = inputVal;
            return newPlayer;
        });
        db.collection('games').doc(gameId).update({
          players: p,
          pointsSubtracted: true
        });
        props.renderGameSummary(gameId);
    };

    const getPlayers = () => {
        const p = [ ...players ];
        let playersContent = p.map((player, index) => {
            return <PlayerSubPoints playerName={player.playerName} key={index} index={index}/>
        });
        return playersContent;
    };

    return (
        <div>
            {fetching ? <LoadingSpinner /> : (
                <div className="game-summary">
                    <Header />
                    <h2>{t("Subtract points of unused letters")}</h2>
                    <ul className="results">
                        {getPlayers()}
                    </ul>
                    <button onClick={validateUserInputs}>{t("Continue")}</button>
                </div>
            )}
        </div>
    );
}
export default SubtractPoints;