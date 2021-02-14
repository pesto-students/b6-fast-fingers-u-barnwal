import React from "react";
import { getScoreAsDuration } from "../../../../utils";

const RowScore = ({ id, score, isBest = false }) => (
  <tr key={"game" + id} className={isBest ? "best" : ""}>
    <th>Game {id}</th>
    <th>:</th>
    <td>{getScoreAsDuration(score)} </td>
  </tr>
);

const RowEmpty = () => (
  <tr>
    <td className="text-center" colSpan="3">
      No games played yet!
    </td>
  </tr>
);

function ScoreBoard({ scores, maxScore = 0 }) {
  return (
    <div className="wrap-scores">
      <div className="title">Score Board</div>
      <div className="body">
        <table>
          <tbody>
            {scores.length <= 0 ? (
              <RowEmpty />
            ) : (
              scores.map((s, index) => (
                <RowScore score={s} id={index + 1} isBest={s === maxScore} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScoreBoard;
