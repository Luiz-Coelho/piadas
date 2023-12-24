import { useEffect, useState } from "react";

export default function Message({ text }) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => {}, 3000);
  }, []);

  return <p>{text}</p>;
}
