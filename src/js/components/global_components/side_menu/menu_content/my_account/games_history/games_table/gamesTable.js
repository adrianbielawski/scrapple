import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import classNames from "classnames/bind";
import styles from "./gamesTable.scss";
//Custom Components
import Pagination from "components/global_components/pagination/pagination";
import GameRow from "./gameRow";
import GameDetails from "./game_details/gameDetails";
//Redux actions
import { fetchGamesHistory } from "actions/sideMenuActions";

const GamesTable = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    props.fetchGamesHistory(1);
  }, []);

  const getRows = () => {
    return props.gamesHistory.results.map((game, i) => {
      return <GameRow key={i} game={game} />;
    });
  };

  const cx = classNames.bind(styles);
  const gamesTableClass = cx({
    gamesTable: true,
    showGames: props.showGamesHistory,
  });

  return (
    props.fetchingGamesHistory === false && (
      <div className={gamesTableClass}>
        <GameDetails show={props.showGameDetails} />
        <Pagination
          data={props.gamesHistory}
          fetchAction={props.fetchGamesHistory}
        />
        <table>
          <thead>
            <tr>
              <th>{t("Game id")}</th>
              <th>{t("Date")}</th>
            </tr>
          </thead>
          <tbody>{props.gamesHistory && getRows()}</tbody>
        </table>
      </div>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    showGamesHistory: state.sideMenu.showGamesHistory,
    gamesHistory: state.sideMenu.gamesHistory,
    fetchingGamesHistory: state.sideMenu.fetchingGamesHistory,
    showGameDetails: state.sideMenu.showGameDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGamesHistory: (page) => dispatch(fetchGamesHistory(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesTable);
