
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import ProductForm from "@/components/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Editar Produto
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Edite as informações do produto
          </p>
        </div>
        <ProductForm mode="edit" initialData={{ id }} />
      </div>
    </>
  );
};

export default EditProduct;
