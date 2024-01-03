import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/user`,
});

/** CONFIRM ORDER */
// const response = await BuyerApi.post("/confirm-order", { cart_id, customer_details },{
//   headers: {
// Authorization: `Bearer ${user}`,
//     "Content-Type": "application/json",
//   },
// });
