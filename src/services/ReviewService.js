import axios from 'axios';

export const createReview = async (courseId, data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/review/create/${courseId}`,
            data
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

// Lấy tất cả đánh giá của khóa học
export const getAllReviewsByCourseId = async (courseId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/review/get-all-review/${courseId}`)
    return res.data;

};

// Cập nhật đánh giá
export const updateReview = async (reviewId, reviewData) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/review/update-review/${reviewId}`, reviewData);
    return res.data;
};

export const deleteReview = async (reviewId) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/review/delete-review/${reviewId}`);
    return res.data;
};

export const getAllReviews = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/review/get-all-reviews`)
    return res.data;
};