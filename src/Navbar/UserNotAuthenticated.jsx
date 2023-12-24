import { Link } from "react-router-dom";

import { VscAccount } from "react-icons/vsc";

const UserNotAuthenticated = () => {
  return (
    <Link to={"/login"}>
      <VscAccount />
    </Link>
  );
};

export default UserNotAuthenticated;
