import React from "react";
import { useGetCollection } from "../../Hooks/useGetCollections";
import QuestionBox from "../questions/QuestionBox";
import { Link } from "react-router-dom";

export const AllCollection = () => {
    const { question, loading, error } = useGetCollection();
    console.log("AllCollection", question);

    return (
        <>
            {question?.length > 0 ? (
                <QuestionBox
                    question={question}
                    loading={loading}
                    error={error}
                />
            ) : (
                <div
                    className="text-center"
                    style={{
                        width: "75%",
                        marginTop: "10rem",
                        textAlign: "center",
                        fontSize: "1.5rem",
                    }}
                >
                    <p>
                        You have no question in your collection...
                        <Link
                            to="/"
                            style={{
                                color: "var(--yellow)",
                                textDecoration: "underline",
                                fontWeight: "bold",
                                fontStyle: "italic",
                                display: "block",
                            }}
                        >
                            {" "}
                            Explore Questions
                        </Link>
                    </p>
                </div>
            )}
        </>
    );
};
