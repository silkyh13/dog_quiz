import React, { useEffect, useRef, useState } from "react";

export default function Results({ setSpinner, spinner, correct }) {
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  useEffect(() => {
    setCopySuccess("");
  }, [spinner]);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess("Copied!");
  }

  return (
    <div className={spinner ? "darkscreen" : "none"}>
      <div className="popup">
        <h2>{correct > 6 ? "Total Dog-wise" : "Today has been ruff. "}</h2>
        <div
          className="close"
          onClick={() => {
            setSpinner(false);
          }}
        >
          &times;
        </div>
        <div className="message">
          You got a score of {correct * 10}%!{" "}
          {correct > 6
            ? "I can feel you are so paw-ssionate about dogs."
            : "Anything is paw-sible if you keep trying."}
        </div>

        <div>
          {/* Logical shortcut for only displaying the 
          button if the copy command exists */
          document.queryCommandSupported("copy") && (
            <div className="bubble-button-container">
              <div className="bubbles-button copy">{copySuccess}</div>
              <button
                className="bubbles-button share"
                onClick={copyToClipboard}
              >
                Share
                <span />
                <span />
                <span />
                <span />
              </button>
            </div>
          )}
          <form style={{ opacity: "0", position: "absolute" }}>
            <textarea ref={textAreaRef} value="https://wiwvp.csb.app/Quiz" />
          </form>
        </div>
      </div>
    </div>
  );
}
