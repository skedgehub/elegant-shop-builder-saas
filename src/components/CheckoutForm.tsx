
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CheckoutFormProps {
  onSubmit: (data: any) => void;
  onBack?: () => void;
  totalPrice: number;
}

const CheckoutForm = ({ onSubmit, onBack, totalPrice }: CheckoutFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados para Entrega</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              {...register("name", { required: "Nome é obrigatório" })}
              placeholder="Seu nome completo"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{String(errors.name.message)}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone", { required: "Telefone é obrigatório" })}
              placeholder="(11) 99999-9999"
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{String(errors.phone.message)}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <Label htmlFor="address">Endereço *</Label>
            <Input
              id="address"
              {...register("address", { required: "Endereço é obrigatório" })}
              placeholder="Rua, número, complemento"
            />
            {errors.address && (
              <p className="text-sm text-red-600">{String(errors.address.message)}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">Cidade *</Label>
              <Input
                id="city"
                {...register("city", { required: "Cidade é obrigatória" })}
                placeholder="Sua cidade"
              />
              {errors.city && (
                <p className="text-sm text-red-600">{String(errors.city.message)}</p>
              )}
            </div>
            <div>
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                {...register("state")}
                placeholder="SP"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="zipCode">CEP</Label>
            <Input
              id="zipCode"
              {...register("zipCode")}
              placeholder="00000-000"
            />
          </div>

          <div>
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              {...register("observations")}
              placeholder="Observações sobre o pedido"
              rows={3}
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Total:</span>
              <span>R$ {totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex gap-2">
              {onBack && (
                <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                  Voltar
                </Button>
              )}
              <Button type="submit" className="flex-1">
                Finalizar Pedido
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
