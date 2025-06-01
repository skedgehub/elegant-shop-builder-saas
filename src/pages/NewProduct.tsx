
import AdminLayout from "@/components/AdminLayout";
import ProductForm from "@/components/ProductForm";

const NewProduct = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Novo Produto
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Adicione um novo produto ao seu catálogo
          </p>
        </div>
        <ProductForm mode="create" />
      </div>
    </AdminLayout>
  );
};

export default NewProduct;
