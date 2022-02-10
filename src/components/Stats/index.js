import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../redux/actions";

import "./styles.css";

export default function Stats() {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(getStats());
  }, []);

  const { completed = 0, total = 0 } = stats;

  let content = (
    <>
      Completed
      <br />
      {completed} / {total}
    </>
  );

  if (completed === total) {
    content = <>All done!</>;
  }

  return <div className="stats">{content}</div>;
}
