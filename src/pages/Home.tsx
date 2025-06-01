
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Bem-vindo ao Sistema de Catálogo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gerencie seus produtos e crie catálogos online profissionais
          </p>
          <div className="space-x-4">
            <Button onClick={() => navigate("/login")}>
              Fazer Login
            </Button>
            <Button variant="outline" onClick={() => navigate("/register")}>
              Criar Conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
