import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import db from '../../../firebase';
import '../../../styles/game-summary.scss';
//Custom Components
import PlayerSubPoints from '../subtract_points/player-subtract-points';
import Header from '../global_components/header';
import LoadingSpinner from '../global_components/loadingSpinner';
//Redux Actions
import { setGameId, setAlert, setScreen } from '../../actions/appActions';
import { setPlayers } from '../../actions/gameActions';

const SubtractPoints = (props) => {
    const { t } = useTranslation();
    const [fetching, setFetching] = useState(true);
    

    useEffect(() => {
        const gameId =  props.gameId || getGameId();

        db.collection('games').doc(gameId).get()
        .then((response) => {
            const data = response.data();
            props.setPlayers(data.players);
            setFetching(false)
        })
        .catch(() => {
            this.setAlert('alert', 'Something went wrong, please check your internet connection and try again');
        });;
    }, []);

    const getGameId = () => {
        const pathArray = window.location.pathname.split('/');
        const gameId = pathArray[2];
        props.setGameId(gameId);
        return gameId;
    }

    const validateUserInputs = (e) => {
        for (let i = 0; i < props.players.length; i++) {
            const inputVal = document.getElementById(`sub-points${i}`).value;
            inputVal = parseFloat(inputVal);
            if(!inputVal) {
                inputVal = 0
            }
            if (inputVal < 0 || !Number.isInteger(inputVal)) {
                props.setAlert('alert', 'Points value must be positive integer');
                return
            };
        };
        subPoints(e);
    };

    const subPoints = (e) => {
        e.preventDefault();
        const players = [ ...props.players ];
        players.map((player, index) => {
            const inputVal = document.getElementById(`sub-points${index}`).value;
            let newPlayer = player;
            newPlayer.currentScore -= inputVal;
            newPlayer.subtractedPoints = inputVal;
            return newPlayer;
        });
        db.collection('games').doc(props.gameId).update({
          players,
          pointsSubtracted: true
        });
        props.setScreen(`Game/${props.gameId}/GameSummary`);
    };

    const getPlayers = () => {
        const players = [ ...props.players ];
        let playersContent = players.map((player, index) => {
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

const mapStateToProps = (state) => {
    return {
        gameId: state.app.gameId,
        players: state.game.players,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setGameId: (gameId) => { dispatch(setGameId(gameId)) },
        setPlayers: (players) => { dispatch(setPlayers(players)) },
        setAlert: (type, messageKey, messageValue, action, props) => { dispatch(setAlert(type, messageKey, messageValue, action, props)) },
        setScreen: (gameId) => { dispatch(setScreen(gameId)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubtractPoints);