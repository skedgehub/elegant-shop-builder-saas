
import AdminLayout from "@/components/AdminLayout";
import ProductForm from "@/components/ProductForm";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Editar Produto
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Edite as informações do produto
          </p>
        </div>
        <ProductForm mode="edit" productId={id} />
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
