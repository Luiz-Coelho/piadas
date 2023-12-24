import SingleJoke from "./SingleJoke";
import TwopartJoke from "./TwopartJoke";
import ErrorJoke from "./ErrorJoke";
import Controls from "./Controls";

export default function JokeResponse({
  single,
  setup,
  delivery,
  error,
  message,
  otherJoke,
  addFavorite,
}) {
  return (
    <div>
      {single && <SingleJoke single={single} />}
      {setup && <TwopartJoke setup={setup} delivery={delivery} />}
      {error && <ErrorJoke message={message} />}
      <Controls otherJoke={otherJoke} addFavorite={addFavorite} />
    </div>
  );
}
