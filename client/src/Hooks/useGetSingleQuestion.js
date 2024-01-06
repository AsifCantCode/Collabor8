import { useEffect, useState } from "react";
import UserApi from "../apis/UserApi";
import { useAuthContext } from "./useAuthContext";

export const useGetSingleQuestion = (id) => {
  const [question, setQuestion] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    const getQuestion = async () => {
      // API CALL HERE...
      try {
        const response = await UserApi.get("/single-question", {
          params: {
            questionId: id,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
        });
        console.log("GET QUESTION RESPONSE: ", response.data);
        setQuestion(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getQuestion();
  }, [id]);

  return { question, loading, error };
};
