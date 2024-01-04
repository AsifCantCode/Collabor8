import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/user`,
});

/** ALL TAGS */
// const response = await UserApi.post("/all-tags",{
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

/** POPULAR TAGS */
// const response = await UserApi.post("/popular-tags",{
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

/**SAMPLE */
// const response = await UserApi.post("/all-tags",{prop1,prop2},{
//   headers: {
// Authorization: `Bearer ${user}`,
//     "Content-Type": "application/json",
//   },
// });
