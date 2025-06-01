
import AdminLayout from "@/components/AdminLayout";
import CategoryForm from "@/components/CategoryForm";
import { useParams } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams();

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Editar Categoria
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Edite as informações da categoria
          </p>
        </div>
        <CategoryForm mode="edit" categoryId={id} />
      </div>
    </AdminLayout>
  );
};

export default EditCategory;
