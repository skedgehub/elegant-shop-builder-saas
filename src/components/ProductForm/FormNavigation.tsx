
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  isCreating: boolean;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const FormNavigation = ({
  currentStep,
  totalSteps,
  isCreating,
  onPrevStep,
  onNextStep,
}: FormNavigationProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevStep}
        disabled={currentStep === 0}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </Button>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/products")}
        >
          Cancelar
        </Button>

        {currentStep < totalSteps - 1 ? (
          <Button
            type="button"
            onClick={onNextStep}
            className="flex items-center gap-2"
          >
            Próximo
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium flex items-center gap-2"
            disabled={isCreating}
          >
            {isCreating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Criando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Criar Produto
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
