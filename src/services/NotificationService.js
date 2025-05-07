import axios from "axios";

export const axiosJWT = axios.create();

export const createNotification = async (data, token) => {
    const res = await axios.post( `${process.env.REACT_APP_API_URL}/notification/create`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const getAllNotification = async (token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/notification/get-all-notification`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};


export const getNotificationById = async (id, token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/notification/get-notification/${id}`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const updateNotification = async (id, data, token) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/notification/update/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const deleteNotification = async (id, token) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/notification/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};
