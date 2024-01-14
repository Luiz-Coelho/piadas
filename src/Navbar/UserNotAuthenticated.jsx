import { Link } from "react-router-dom";

import { VscAccount } from "react-icons/vsc";

const UserNotAuthenticated = () => {
  return (
    <li>
      <Link to={"/login"}>
        <VscAccount />
      </Link>
    </li>
  );
};

export default UserNotAuthenticated;
