import httpService from "./http.service";
const todosEndpoint = "todos/";
const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: {
        _page: 1,
        _limit: 5,
      },
    });
    return data;
  },
  create: async (taskData) => {
    const { data } = await httpService.post(todosEndpoint, {
      method: "POST",
      body: JSON.stringify(taskData.payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const response = JSON.parse(data.body);
    return {
      userId: response.userId,
      id: taskData.payload.userId,
      title: response.title,
      completed: response.completed,
    };
  },
};
export default todosService;
