import apiClient from "../../../../common/configuration/axios.config";

export function useTeacher() {
  const fetchAll = async () => {
    try {
      const response = await apiClient.get('/teacher/get-all'); // เปลี่ยน URL ให้ตรงกับ backend ของคุณ
      return response.data;
    } catch (error) {
      console.error('Failed to fetch teachers', error);
      return { data: [] };
    }
  };

  return {
    fetchAll
  };
}
