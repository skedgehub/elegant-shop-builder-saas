import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  authService,
  LoginData,
  RegisterData,
  User,
} from "@/services/authService";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { $api } from "@/lib/api";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading } = $api.useQuery("get", "/api/v1/user/me", {
    queryKey: ["user"],
    retry: false,
  });

  const loginMutation = $api.useMutation(
    "post",
    "/api/v1/auth/company/sign-in",
    {
      onSuccess(data, variables, context) {
        toast({
          title: "Login realizado!",
          description: `Bem-vindo!`,
        });

        console.log(data);
        navigate("/admin");
      },
      onError(error, variables, context) {
        toast({
          title: "Erro no cadastro",
          description: JSON.stringify(error),
          variant: "destructive",
        });
      },
    }
  );

  const registerMutation = $api.useMutation(
    "post",
    "/api/v1/auth/company/sign-in",
    {
      onSuccess(data, variables, context) {
        toast({
          title: "Login realizado!",
          description: `Bem-vindo!`,
        });

        console.log(data);
        navigate("/admin");
      },
      onError(error, variables, context) {
        toast({
          title: "Erro no cadastro",
          description: JSON.stringify(error),
          variant: "destructive",
        });
      },
    }
  );

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.clear();
      toast({
        title: "Logout realizado",
        description: "Até logo!",
      });
      navigate("/");
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
  };
};
