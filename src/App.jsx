import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [urlData, setUrlData] = useState(null);

  useEffect(() => {
    const redirectedUrl = window.sessionStorage.getItem("redirect");
    window.sessionStorage.removeItem("redirect");

    const urlToParse = redirectedUrl || window.location.href;
    const parsedUrl = new URL(urlToParse);
    const pathParts = parsedUrl.pathname
      .split("/")
      .filter((part) => part && part !== "url-parser-app");

    const queryParams = {};
    for (let [key, value] of parsedUrl.searchParams.entries()) {
      queryParams[key] = value;
    }

    setUrlData({
      fullUrl: parsedUrl.href,
      fullPath: parsedUrl.pathname,
      pathParts: pathParts,
      queryParams: queryParams,
    });
  }, []);

  if (!urlData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>URL Parameters Parser</h1>

      <p className="full-url-text">
        <strong>Full URL:</strong> {urlData.fullUrl}
      </p>

      <h2>Path Components</h2>
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Full Path</td>
            <td>{urlData.fullPath}</td>
          </tr>
          {urlData.pathParts.map((part, index) => (
            <tr key={index}>
              <td>Part {index + 1}</td>
              <td>{part}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Query Parameters</h2>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value(s)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(urlData.queryParams).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{urlData.queryParams[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
