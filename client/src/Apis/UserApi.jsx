import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/user`,
});

/** ALL TAGS */
// const response = await UserApi.get("/all-tags",{
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

/** POPULAR TAGS */
// const response = await UserApi.get("/popular-tags",{
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

/**UPDATE QUESTIONS */
/** MUST USE ----> formData.append("questionId",questionId) */
/**REST SIMILAR TO ADD QUESTIONs */
// const response = await UserApi.put("/update-question",formData,{
//   headers: {
// Authorization: `Bearer ${user}`,
//   },
// });

/**SAMPLE */
// const response = await UserApi.post("/all-tags",{prop1,prop2},{
//   headers: {
// Authorization: `Bearer ${user}`,
//     "Content-Type": "application/json",
//   },
// });
