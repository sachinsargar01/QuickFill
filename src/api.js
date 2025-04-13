// src/api.js
export const fetchQuestions = async () => {
  const response = await fetch("http://localhost:3001/data"); // Replace with your API endpoint
  const data = await response.json();
  return data;
};
