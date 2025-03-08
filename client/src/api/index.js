import axios from "axios";

export const baseUrl =
  "http://localhost:5001/fullstack-food-app-85551/us-central1/app";

export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseUrl}/api/users/jwtVerification`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// add new product

export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${baseUrl}/api/products/create`, { ...data });
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//get all the products

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/products/all`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//delete a product

export const deleteAProduct = async (productId) => {
  try {
    const res = await axios.delete(
      `${baseUrl}/api/products/delete/${productId}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// get all users

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/users/all`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// add an item to cart

export const addNewItemToCart = async (user_id, data) => {
  try {
    const res = await axios.post(
      `${baseUrl}/api/products/addToCart/${user_id}`,
      { ...data }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const getAllCartItems = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseUrl}/api/products/getCartItems/${user_id}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};
