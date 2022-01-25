import {} from 'react';
import {userConfig} from '../../config/user'


export const Avatar = function () {
  return (
    <>
      <img style={{
        height: "150px",
        width: "150px",
        border: "2px solid white",
        borderRadius: "50%",
        margin: "30px 0",
      }}
      src={userConfig.avatar}
      />
    </>
  );
};
