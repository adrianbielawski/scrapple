import React from 'react';
//Custom Components
import LogOut from './logout';
import UserName from './userName';

const AccountInfo = (props) => {
    return (
        <div className="account-info">
            <UserName />
            <LogOut />
        </div>
     );
}

export default AccountInfo;