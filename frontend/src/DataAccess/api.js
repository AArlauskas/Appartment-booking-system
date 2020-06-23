import axios from "axios";

export const getListData = () => {
    return axios.get(
        "/api/v1/listData"
    );
};

export const addListItem = (data) => {
    return axios.post(
        "/api/v1/listData",
        data
    );
};

export const deleteListItem = (id) => {
    return axios.delete(
        `/api/v1/listData/${id}`,
    );
};

export const updateListItem = (id, data) => {
    return axios.post(
        `/api/v1/listData/${id}`,
        data
    );
}

// Scheduler 

export const getSchedulerEvents = () => {
    return axios.get(
        "/api/v1/schedulerEvents"
    );
}

export const getSchedulerResources = () => {
    return axios.get(
        "/api/v1/schedulerResources"
    );
}

export const addNewSchedulerEvent = (data) => {
    return axios.post(
        "/api/v1/schedulerEvents",
        data
    );
}

export const editSchedulerEvent = (data) => {
    let id = data.event.id;
    return axios.put(
        `/api/v1/schedulerEvents/${id}`,
        data
    );
}

export const deleteSchedulerEvent = (data) => {
    let id = data.event.id;
    return axios.delete(
        `/api/v1/schedulerEvents/${id}`,
        data
    );
}

// Tags 

export const getTagsData = () => {
    return axios.get(
        "/api/v1/tagsData"
    );
}

export const getTagCategoriesData = () => {
    return axios.get(
        "/api/v1/categoriesData"
    );
}

export const addNewTag = (data) => {
    return axios.post(
        "/api/v1/tagsData",
        data
    );
}

export const editTag = (data) => {
    let id = data.id;
    return axios.put(
        `/api/v1/tagsData/${id}`,
        data
    );
}

export const deleteTag = (data) => {
    let id = data;
    return axios.delete(
        `/api/v1/tagsData/${id}`,
        data
    );
}