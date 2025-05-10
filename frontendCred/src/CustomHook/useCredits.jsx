import { useEffect, useState } from "react";


export default function useCredits() {
  const [credits, setCredits] = useState(0); // State to store credits

  // 🟢 Fetch total credits from backend
  const fetchCredits = async () => {
    try {
      const response = await fetch("http://localhost:3000/credits");

      if (!response.ok) {
        throw new Error("Failed to fetch credit score");
      }

      const data = await response.json();

      setCredits(data.credits);
    } catch (err) {
      console.log(`error is ${err}`);
    }
  };

  // 🟢 Update credits in backend
  const updateCredits = async (amount) => {
    try {
      const response = await fetch( "http://localhost:3000/credits" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) throw new Error("Failed to update credits");
      const data = await response.json();
      setCredits(data.credits); // Update state after backend update
      fetchCredits();
    } catch (error) {
      console.error("Failed to update credits:", error);
    }
  };

  // 🟢 Fetch credits on component mount
  useEffect(() => {
    fetchCredits();
  }, []);

  return { credits, fetchCredits, updateCredits };
};