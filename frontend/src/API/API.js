import axios from "axios";

// a simple class wrapper around the API service.
let token = window.localStorage.getItem("adal.idtoken");
let baseUri = "https://localhost:44345/";
let AuthenticatedApi = axios.create({
	baseURL: baseUri,
	headers: {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
});

export const GetAllCategories = async () => {
	return await AuthenticatedApi.get("api/category/all")
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response.status === 401) {
				window.localStorage.clear();
				window.location.reload();
			}
			else {
				throw Error("An error has occurred calling the api: " + error);
			}
		});
};

export const GetAllTags = async () => {
	return await AuthenticatedApi.get("api/tag/all")
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response.status === 401) {
				window.localStorage.clear();
				window.location.reload();
			}
			else {
				throw Error("An error has occurred calling the api: " + error);
			}
		});
};

export const CreateCategory = async (data) => {
	return await AuthenticatedApi.post("api/category/add", data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response.status === 401) {
				window.localStorage.clear();
				window.location.reload();
			}
			else {
				throw Error("An error has occurred calling the api: " + error);
			}
		});
};

export const UpdateCategory = async (data) => {
	return await AuthenticatedApi.put("api/category/update/" + data.id, data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response.status === 401) {
				window.localStorage.clear();
				window.location.reload();
			}
			else {
				throw Error("An error has occurred calling the api: " + error);
			}
		});
};

export const DeleteCategory = async (id) => {
	return await AuthenticatedApi.delete("api/category/delete/" + id)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response.status === 401) {
				window.localStorage.clear();
				window.location.reload();
			}
			else {
				throw Error("An error has occurred calling the api: " + error);
			}
		});
};

export const DeleteTagById = async (id) => {
	return await AuthenticatedApi.delete("api/tag/delete/" + id)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response.status === 401) {
				window.localStorage.clear();
				window.location.reload();
			}
			else {
				throw Error("An error has occurred calling the api: " + error);
			}
		});
};

export const AddTag = async (data) => {
	return await AuthenticatedApi.post("api/tag/add", data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response.status === 401) {
				window.localStorage.clear();
				window.location.reload();
			}
			else {
				throw Error("An error has occurred calling the api: " + error);
			}
		});
};

export const UpdateTag = async (data) => {
	return await AuthenticatedApi.put("api/tag/update/" + data.id, data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response.status === 401) {
				window.localStorage.clear();
				window.location.reload();
			}
			else {
				throw Error("An error has occurred calling the api: " + error);
			}
		});
};

export const GetTagNames = async () => {
	return await AuthenticatedApi.get("api/tag/getNames/")
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response.status === 401) {
				window.localStorage.clear();
				window.location.reload();
			}
			else {
				throw Error("An error has occurred calling the api: " + error);
			}
		});
};

export const GetSchedulerEvents = async () => {
	return await AuthenticatedApi.get("api/SchedulerEvent/all")
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response.status === 401) {
				window.localStorage.clear();
				window.location.reload();
			}
			else {
				throw Error("An error has occurred calling the api: " + error);
			}
		});
};

export const CreateSchedulerEvent = async (data) => {
	return await AuthenticatedApi.post("api/SchedulerEvent/add", data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response.status === 401) {
				window.localStorage.clear();
				window.location.reload();
			}
			else {
				throw Error("An error has occurred calling the api: " + error);
			}
		});
};

export const EditeSchedulerEvent = async (data) => {
	return await AuthenticatedApi.put("api/SchedulerEvent/update", data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response.status === 401) {
				window.localStorage.clear();
				window.location.reload();
			}
			else {
				throw Error("An error has occurred calling the api: " + error);
			}
		});
};

export const DeleteSchedulerEvent = async (data) => {
	return await AuthenticatedApi.delete("api/SchedulerEvent/delete/" + data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response.status === 401) {
				window.localStorage.clear();
				window.location.reload();
			}
			else {
				throw Error("An error has occurred calling the api: " + error);
			}
		});
};

export const GetCategoryNames = async () => {
	return await AuthenticatedApi.get("api/category/names")
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response.status === 401) {
				window.localStorage.clear();
				window.location.reload();
			}
			else {
				throw Error("An error has occurred calling the api: " + error);
			}
		});
};
