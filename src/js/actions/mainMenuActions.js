import db from '../../firebase';

export const joinGame = (gameId) => {
  return (() => {
    db.collection('games').doc(gameId).get()
    .then((response) => {
      const data = response.data();
      
      if(this.props.language !== data.language) {
        this.props.changeLanguage(data.language);
      }

      if(data.timer) {
        const random = Math.floor(Math.random() * 100000).toString();
        
        db.collection('games').doc(gameId).update({'joinedPlayers': firebase.firestore.FieldValue.arrayUnion(random)})
        .then(() => {
          this.props.setGameId(gameId);
        
          this.unsubscribe = db.collection('games').doc(gameId).onSnapshot(doc => {
            const data = doc.data();
            if(data.gameStarted == true) {
              this.startJoinedPlayerGame(data.timer, gameId);
            }
          });
        })
        .catch(() => {
          this.props.setAlert('alert', 'Something went wrong, please check game ID');
        });
      } else {
        this.startJoinedPlayerGame(data.timer, gameId)
      }
    })
    .catch(() => {
      this.props.setAlert('alert', 'Something went wrong, please check game ID');
      return
    });
  });
}