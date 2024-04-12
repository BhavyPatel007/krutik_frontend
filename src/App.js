import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    diff: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://krutik-backend.onrender.com/api/get-stock?name=${formData.name}&date=${formData.date}&diff=${formData.diff}`
      );
      const blob = await response.blob();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "stock_data.xlsx");

      // Append the link to the body
      document.body.appendChild(link);

      // Click the link to trigger the download
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <div className="card">
        <h2>Stock Data Form</h2>
        <form onSubmit={fetchData}>
          <label>
            Name:
            <select name="name" value={formData.name} onChange={handleChange}>
              <option value="">Select Name</option>
              <option value="NIFTY">NIFTY</option>
              <option value="BANKNIFTY">BANKNIFTY</option>
              {/* Add more options as needed */}
            </select>
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
          <label>
            Difference:
            <input
              type="number"
              name="diff"
              value={formData.diff}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
