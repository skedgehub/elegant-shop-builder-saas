
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import CategoryForm from "@/components/CategoryForm";
import AdminLayout from "@/components/AdminLayout";

const NewCategory = () => {
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
