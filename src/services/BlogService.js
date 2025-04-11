import axios from "axios";

const BLOG_API = `${process.env.REACT_APP_API_URL}/blog`; // Đường dẫn gốc cho blog

// Tạo blog mới
export const createBlog = async (data, token) => {
  const res = await axios.post(`${BLOG_API}/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Lấy tất cả blog
export const getAllBlogs = async () => {
    const res = await axios.get(`${BLOG_API}/get-all`,
  );
  return res.data;
};

// Lấy blog theo ID
export const getBlogById = async (id, token) => {
  const res = await axios.get(`${BLOG_API}/get-class-by-id/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Cập nhật blog
export const updateBlog = async (id, data, token) => {
  const res = await axios.put(`${BLOG_API}/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Xóa blog
export const deleteBlog = async (id, token) => {
  const res = await axios.delete(`${BLOG_API}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
