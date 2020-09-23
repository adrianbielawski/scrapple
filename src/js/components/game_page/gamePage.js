import React, { useEffect } from 'react';
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

const GamePage = (props) => {
    const { gameId } = useParams(null);

    useEffect(() => {
        props.fetchGameData(gameId);
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
        <div>
            {props.fetchingGameData 
                ? <LoadingSpinner background={true} />
                : getContent()
            }
        </div>
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