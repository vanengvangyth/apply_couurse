import apiClient from "../../../../common/configuration/axios.config";

export function CourseCategoryComposible() {
  const fetchAll = async () => {
    const response = await apiClient.get("/course/categories", {
      params: {
        page: 1,
        limit: 10,
        search: "",
      },
    });
    return response.data;
  };

  const updateCategory = async (id: number, data: any) => {
    const response = await apiClient.put(`course/update-category/${id}`, data);
    return response.data;
  };

  const deleteCategory = async (id: number) => {
    const response = await apiClient.delete(`/course/delete-category/${id}`);
    return response.data;
  };
  return {
    fetchAll,
    updateCategory,
    deleteCategory,
  };
}