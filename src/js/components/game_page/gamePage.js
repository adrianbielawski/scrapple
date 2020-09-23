import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
//Custom Components
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
const GameMenu = React.lazy(() => import('components/game_menu/gameMenu'));
const Game = React.lazy(() => import('components/game/game'));
const GameSummary = React.lazy(() => import('components/game_summary/gameSummary'));
const SubtractPoints = React.lazy(() => import('components/subtract_points/subtractPoints'));
//Redux Actions
import { fetchGameData } from 'actions/gamePageActions';

const NORMAL_CLOSE = 4000;

const GamePage = (props) => {
    const { gameId } = useParams(null);
    const socket = useRef(null);

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
        }

        socket.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data)

            
        };

        socket.current.onclose = (e) => {
            if (e.code === NORMAL_CLOSE) {
                return;
            }
            setTimeout(connect, 1000);
        };
    }

    useEffect(() => {
        props.fetchGameData(gameId);
        connect();

        return () => {
            socket.current.close(NORMAL_CLOSE)
        }
    }, []);

    const getContent = () => {
        if (props.gameData.pointsSubtracted !== false) {
            return <GameSummary />;
        } else if (props.gameData.finishedAt !== null) {
            return <SubtractPoints />;
        } else if (props.gameData.startedAt !== null) {
            return <Game />;
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGameData: (gameId) => dispatch(fetchGameData(gameId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);