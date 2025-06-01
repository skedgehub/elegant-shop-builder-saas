import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import CategoryForm from "@/components/CategoryForm";

const EditCategory = () => {
  const { id } = useParams();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
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
            Editar Categoria
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Edite as informações da categoria
          </p>
        </div>
        <CategoryForm mode="edit" initialData={{ id }} />
      </div>
    </>
  );
};

export default EditCategory;
