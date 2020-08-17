import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { db } from 'firebaseConfig';
import styles from './userInfo.scss'
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
//Custom Components

const UserInfo = (props) => {
    const [fetchingUserData, setFetchingUserData] = useState(true);
    const [userHistory, setUserHistory] = useState(null);

    useEffect(() => {
        db.collection('users').doc(props.user.uid).get()
            .then((response) => {
                setUserHistory(response.data());
                setFetchingUserData(false);
            });
    }, [])

    const getGames = () => {
        return userHistory.allGames.map((game, i) => {
            return <li key={i}>{game}</li>;
        })
    }

    return (
        <div className={styles.userInfo}>
            { fetchingUserData ? <LoadingSpinner background={false} /> : 
            <ul className={styles.gamesHistory}>
                {getGames()}
            </ul>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.app.user,
    }
}

export default connect(mapStateToProps)(UserInfo);