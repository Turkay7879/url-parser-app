import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [urlData, setUrlData] = useState(null);

  useEffect(() => {
    // Get the current URL from the browser's address bar
    const currentUrl = window.location.href;

    // Use the URL constructor to parse the URL
    const parsedUrl = new URL(currentUrl);

    // Split the pathname into its parts
    const pathParts = parsedUrl.pathname.split("/").filter((part) => part);

    // Convert the query parameters to an object
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
  }, []); // This useEffect runs only once when the component mounts

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
