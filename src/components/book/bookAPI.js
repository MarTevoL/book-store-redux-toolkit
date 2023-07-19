import api from "../../apiService";

// export const fetchBooks = async ({ pageNum, limit, query }) => {
//   try {
//     let url = `/book?_page=${pageNum}&_limit=${limit}`;
//     if (query) {
//       url += `&q=${query}`;
//     }
//     const res = await api.get(url);
//     return res;
//   } catch (error) {
//     return error;
//   }
// };
export const fetchBooks = async ({ pageNum, limit, query }) => {
  try {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const res = await api.get(url);
    return res;
  } catch (error) {
    return error;
  }
};
