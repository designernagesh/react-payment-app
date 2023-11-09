import { useState } from "react";
import { mockPaymentApi } from "../api/MockPaymentApi";

export const PaymentDialog = ({ onClose }) => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("USD");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const handleToChange = (event) => {
    const email = event.target.value;
    // You can add email validation here if needed
    setTo(email);
    validateFields(email, from, amount);
  };

  const handleFromChange = (event) => {
    const currency = event.target.value;
    setFrom(currency);
    validateFields(to, currency, amount);
  };

  const handleAmountChange = (event) => {
    const amountValue = event.target.value;
    setAmount(amountValue);
    validateFields(to, from, amountValue);
  };

  const validateFields = (toValue, fromValue, amountValue) => {
    // Enable the Submit button if all mandatory fields are filled
    setSubmitEnabled(!!toValue && !!fromValue && !!amountValue);
  };

  const handleSubmit = () => {
    // Disable the Submit button while processing
    setSubmitEnabled(false);

    mockPaymentApi({ to, from, amount, description })
      .then((response) => {
        if (response.status === 200) {
          // Handle a successful payment
          alert(response.message); // You can display a success dialog or message
          onClose();
        } else {
          // Handle unexpected server response
          alert("Server Error: Unexpected response");
          setSubmitEnabled(true); // Enable the Submit button after handling the error
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          // Handle 400 Bad Request
          alert(`Bad Request: ${error.message}`);
        } else if (error.status === 401) {
          // Handle 401 Unauthorized
          alert(`Unauthorized: ${error.message}`);
          // Redirect to the login page (you need to implement the routing)
        } else {
          // Handle 5XX Server Error
          alert(`Server Error: ${error.message}`);
        }
        setSubmitEnabled(true); // Enable the Submit button after handling the error
      });
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="payment-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Payment Dialog</h2>
        <div className="form-group">
            <label>
            To:
            </label>
            <input type="text" value={to} onChange={handleToChange} />
        </div>

        <div className="form-group">
            <label>
            From:
            </label>
            <select value={from} onChange={handleFromChange}>
                <option value="USD">USD</option>
                <option value="INR">INR</option>
            </select>
        </div>

        <div className="form-group">
        <label>
          Amount:
        </label>
          <input type="number" value={amount} onChange={handleAmountChange} />
        </div>


        <div className="form-group">
        <label>
          Description:
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            </div>
        <button onClick={onClose}>Cancel</button> &nbsp;

        <button onClick={handleSubmit} disabled={!submitEnabled}>
          Submit
        </button>
      </div>
    </div>
  );
};
