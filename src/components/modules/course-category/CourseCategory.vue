<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { CourseCategoryComposible } from './composible/index';

const { fetchAll, deleteCategory, updateCategory } = CourseCategoryComposible();

const columns = [
    {
        title: 'No',
        key: 'no',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Action',
        key: 'action',
    },
];

const data = reactive<any>({
    categories: []
});

// Modal state
const isEditModalVisible = ref(false);
const editForm = reactive({
    id: null as number | null,
    name: ''
});

async function loadCategories() {
    const response = await fetchAll();
    data.categories = response.data;
}

onMounted(loadCategories);

function showModalEdit(record: any) {
    editForm.id = record.id;
    editForm.name = record.name;
    isEditModalVisible.value = true;
}

async function handleEditOk() {
    if (editForm.id !== null) {
        await updateCategory(editForm.id, { name: editForm.name });
        isEditModalVisible.value = false;
        await loadCategories();
    }
}

function handleEditCancel() {
    isEditModalVisible.value = false;
}

async function onDelete(id: number) {
    await deleteCategory(id);
    await loadCategories();
}

</script>

<template>
    <div>
        <a-table :dataSource="data.categories" :columns="columns" rowKey="id">
            <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'no'">
                    {{ index + 1 }}
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <a @click="() => showModalEdit(record)">Edit</a>
                        <a-divider type="vertical" />
                        <a-popconfirm title="Sure to delete?" @confirm="() => onDelete(record.id)">
                            <a>Delete</a>
                        </a-popconfirm>
                    </span>
                </template>
                <template v-else>
                    {{ record[column.dataIndex] }}
                </template>
            </template>
        </a-table>

        <!-- Edit Modal -->
        <a-modal v-model:open="isEditModalVisible" title="Edit Category" @ok="handleEditOk" @cancel="handleEditCancel">
            <a-form>
                <a-form-item label="Name">
                    <a-input v-model:value="editForm.name" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<style lang="scss" scoped></style>