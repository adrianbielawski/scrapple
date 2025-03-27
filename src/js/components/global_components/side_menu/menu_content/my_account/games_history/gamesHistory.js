import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "./gamesHistory.scss";
//Custom Components
import GamesTable from "./games_table/gamesTable";
import LoadingSpinner from "components/global_components/loading_spinner/loadingSpinner";
//Redux actions
import { openGamesHistory, closeGamesHistory } from "actions/sideMenuActions";

const GamesHistory = (props) => {
  const { t } = useTranslation();

  const handleClick = () => {
    if (props.showGamesHistory) {
      props.closeGamesHistory();
    } else {
      props.openGamesHistory();
    }
  };

  return (
    <div className={styles.gamesHistory}>
      <div className={styles.title}>
        <p onClick={handleClick}>{t("Games history")}</p>
        {props.fetchingGamesHistory && <LoadingSpinner size={20} />}
      </div>
      {props.showGamesHistory && <GamesTable />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchingGamesHistory: state.sideMenu.fetchingGamesHistory,
    gamesHistory: state.sideMenu.gamesHistory,
    showGamesHistory: state.sideMenu.showGamesHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openGamesHistory: () => dispatch(openGamesHistory()),
    closeGamesHistory: () => dispatch(closeGamesHistory()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesHistory);
