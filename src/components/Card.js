import React from "react";

// This functional component takes three props and creates a card. Used for debits and credits
const DebitCard = ({ description, amount, date }) => {
    return (
      <div className="card text-center m-5">
        <div className="card-header">
            {description}
        </div>
        <div className="card-body">
          <p className="card-text">
            ${amount}
          </p>
        </div>
        <div className="card-footer text-muted">
            {date}
        </div>
      </div>
    );
}

export default DebitCard;