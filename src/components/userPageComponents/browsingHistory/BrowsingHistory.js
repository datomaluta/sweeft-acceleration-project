import { Link } from "react-router-dom";

const BrowsingHistory = (props) => {
  return (
    <div className="flex px-4 mt-6 flex-wrap">
      {props.browsingHistory.map((user, index) => (
        <div key={user.name + Math.random()}>
          <Link
            to={`/user/${user.id}`}
            className="text-purple-700 underline mx-2"
          >
            {`${user.prefix} ${user.name} ${user.lastName}`}
          </Link>
          {index !== props.browsingHistory.length - 1 ? (
            <span className="!no-underline">&gt;</span>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default BrowsingHistory;
