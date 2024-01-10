import axios from "axios";

export default axios.create({
    baseURL: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/user`,
});

/** GET ALL QUESTIONS */
// const response = await UserApi.get("/all-questions",{
// params:{token:user},
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

/** TAG BASED QUESTIONS */
// const response = await UserApi.get("/tag-questions",{
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

/** RELATED QUESTIONS */
// const response = await UserApi.get("/related-questions",,{
// params:{tags:commaSepTagList},
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

/**PERSONAL QUESTIONS */
// const response = await UserApi.get("/personal-questions",{
//   headers: {
// Authorization: `Bearer ${user}`,
//   },
// });

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

/**FOLLOW-UNFOLLOW (if follow is given true will follow, if given false will unfollow) */
// const response = await UserApi.put("/follow-unfollow",{userId,follow},{
//   headers: {
// Authorization: `Bearer ${user}`,
//     "Content-Type": "application/json",
//   },
// });

/**UPVOTE-DOWNVOTE (if upvote is given true will upvote else downvote for false) */
// const response = await UserApi.put("/upvote-downvote",{ questionId, upvote },{
//   headers: {
// Authorization: `Bearer ${user}`,
//     "Content-Type": "application/json",
//   },
// });

/**ADD TO COLLECTION */
// const response = await UserApi.post("/add-to-collection",{questionId},{
//   headers: {
// Authorization: `Bearer ${user}`,
//     "Content-Type": "application/json",
//   },
// });

/**REMOVE FROM COLLECTION*/
// const response = await UserApi.delete("/remove-from-collection",{
// params:{questionId},
//   headers: {
// Authorization: `Bearer ${user}`,
//     "Content-Type": "application/json",
//   },
// });

/**ADD COMMENT*/
// const response = await UserApi.post("/add-comment",{ answerId, commentText },{
//   headers: {
// Authorization: `Bearer ${user}`,
//     "Content-Type": "application/json",
//   },
// });

/**UPDATE COMMENT*/
// const response = await UserApi.put("/update-comment",{ answerId, commentArray },{
//   headers: {
// Authorization: `Bearer ${user}`,
//     "Content-Type": "application/json",
//   },
// });
