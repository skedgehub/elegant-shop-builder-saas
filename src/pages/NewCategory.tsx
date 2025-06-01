
import AdminLayout from "@/components/AdminLayout";
import CategoryForm from "@/components/CategoryForm";

const NewCategory = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Nova Categoria
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Adicione uma nova categoria ao seu catálogo
          </p>
        </div>
        <CategoryForm mode="create" />
      </div>
    </AdminLayout>
  );
};

export default NewCategory;
