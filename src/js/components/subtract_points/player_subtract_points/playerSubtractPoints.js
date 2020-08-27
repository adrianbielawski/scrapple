import React from 'react';
import styles from './playerSubtractPoints.scss';
//Custom Components
import Card from 'components/global_components/card/card';
import Input from 'components/global_components/input/input';

const PlayerSubPoints = (props) => {
    return (
        <li className={styles.player}>
            <Card className={styles.card}>
                <div className={styles.playerName}>{props.playerName}</div>
                <Input type="number" placeholder="0" onChange={props.onChange} />
            </Card>
        </li>
    );
}
export default PlayerSubPoints;