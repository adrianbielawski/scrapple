import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
//Custom Components
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import JoinGameConfirmation from './join_game_confirmation/joinGameConfirmation';
const GameMenu = React.lazy(() => import('components/game_menu/gameMenu'));
const Game = React.lazy(() => import('components/game/game'));
const GameSummary = React.lazy(() => import('components/game_summary/gameSummary'));
const SubtractPoints = React.lazy(() => import('components/subtract_points/subtractPoints'));
//Redux Actions
import { webSocketAuthenticated, fetchGameData, playersChanged, gameChanged,
    joinNewGame, gameClosed } from 'actions/gamePageActions';

const GamePage = (props) => {
    const { gameId } = useParams(null);
    const socket = useRef(null);
    const admin = props.user.id === props.gameData.createdBy;

    const connect = () => {
        socket.current = new WebSocket(
            `ws://192.168.1.10:8000/ws/games/${gameId}/`
        );

        socket.current.onopen = () => {
            const token = localStorage.getItem('token');
            socket.current.send(JSON.stringify({
                type: 'authenticate',
                token,
            }));
        };

        socket.current.onmessage = (e) => {
            const data = JSON.parse(e.data);

            switch (data.type) {
                case 'authentication_successful':
                    props.webSocketAuthenticated(data.timestamp);
                    break;
                case 'players_changed':
                    props.playersChanged(data.players);
                    break;
                case 'game_changed':
                    props.gameChanged(data.game);
                    break;
                case 'game_created':
                    props.joinNewGame(data.game, props.history);
                    break;
                case 'game_closed':
                    props.gameClosed(admin, props.history);
                    break;
            }
        };

        socket.current.onclose = (e) => {
            if (e.wasClean) {
                return;
            }
            setTimeout(connect, 1000);
        };
    }

    useEffect(() => {
        props.fetchGameData(gameId);
        connect();

        return () => {
            socket.current.close();
        }
    }, [gameId, props.gameData.createdBy]);

    const getContent = () => {
        if (props.gameData.pointsSubtracted !== false) {
            return <GameSummary />;
        } else if (admin && props.gameData.finishedAt !== null) {
            return <SubtractPoints />;
        } else if (props.gameData.startedAt !== null) {
            return <Game />;
        } else if (props.gameData.createdAt !== null && props.user.id !== props.gameData.createdBy) {
            return <JoinGameConfirmation />;
        } else if (props.gameData.createdAt !== null) {
            return <GameMenu />;
        }
    }

    return (
        props.fetchingGameData ? <LoadingSpinner background={true} /> : getContent()
    );
}

const mapStateToProps = (state) => {
    return {
        fetchingGameData: state.gamePage.fetchingGameData,
        gameData: state.gamePage.gameData,
        user: state.app.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        webSocketAuthenticated: (timestamp) => dispatch(webSocketAuthenticated(timestamp)),
        fetchGameData: (gameId) => dispatch(fetchGameData(gameId)),
        playersChanged: (players) => dispatch(playersChanged(players)),
        gameChanged: (gameData) => dispatch(gameChanged(gameData)),
        joinNewGame: (gameData, history) => dispatch(joinNewGame(gameData, history)),
        gameClosed: (admin, history) => dispatch(gameClosed(admin, history)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);