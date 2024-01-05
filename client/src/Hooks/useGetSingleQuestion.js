import { useEffect, useState } from "react";
import UserApi from "../apis/UserApi";

export const useGetSingleQuestion = (id) => {
  const [question, setQuestion] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getQuestion = async () => {
      // API CALL HERE...
      try {
        const { data } = await UserApi.get("/single-question", {
          params: {
            questionId: id,
          },
        });
        setQuestion(data);
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
