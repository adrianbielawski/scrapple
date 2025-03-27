import React, { useEffect } from "react";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import { useTranslation } from "react-i18next";
import * as styles from "./allPoints.scss";
//Custom Components
import RoundPoints from "../round_points/roundPoints";
//Redux actions
import { getAllPoints } from "actions/gameActions";
import Pagination from "components/global_components/pagination/pagination";

const POINTS_SIZE = 24;
const OTHER_CONTENT_SIZE = 45;

const AllPoints = (props) => {
  const { t } = useTranslation();
  const allPointsData = props.allPointsData[props.player.id] || null;

  useEffect(() => {
    props.getAllPoints(1, { playerId: props.player.id });
  }, []);

  useEffect(() => {
    if (allPointsData !== null) {
      props.getAllPoints(allPointsData.current, { playerId: props.player.id });
    }
  }, [props.players]);

  const getRoundPoints = () => {
    const data = cloneDeep(allPointsData);
    const points = allPointsData.results.map((points, index) => ({
      round: data.count - data.startIndex - index + 1,
      points: points.value,
    }));

    return points.map((p, index) => (
      <RoundPoints round={p.round} points={p.points} key={index} />
    ));
  };

  const pointsStyle =
    allPointsData !== null && !props.closing
      ? allPointsData.results.length * POINTS_SIZE + OTHER_CONTENT_SIZE
      : 0;

  return (
    <div className={styles.allPoints} style={{ maxHeight: `${pointsStyle}px` }}>
      <p>{t("Best score", { best: props.player.bestScore })}</p>
      {allPointsData !== null && (
        <Pagination
          data={props.allPointsData[props.player.id]}
          fetchAction={props.getAllPoints}
          params={{ playerId: props.player.id }}
        />
      )}
      <ul>{allPointsData !== null && getRoundPoints()}</ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allPointsData: state.game.allPointsData,
    players: state.gamePage.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPoints: (playerId, page) => dispatch(getAllPoints(playerId, page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPoints);

