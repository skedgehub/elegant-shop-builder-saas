
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles, Gift } from "lucide-react";
import { Link } from "react-router-dom";

interface PromotionalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromotionalModal = ({ isOpen, onClose }: PromotionalModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-primary/5 to-green-50 border-primary/20">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 rounded-full p-3">
              <Gift className="h-8 w-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-black">
            🎉 Oferta Especial!
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Não perca esta oportunidade exclusiva
          </DialogDescription>
        </DialogHeader>
        
        <div className="text-center py-6">
          <Badge className="mb-4 bg-primary text-black px-4 py-2 text-lg">
            <Sparkles className="h-4 w-4 mr-2" />
            30% OFF
          </Badge>
          
          <h3 className="text-xl font-semibold text-black mb-4">
            Primeira mensalidade com desconto
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            Transforme sua operação digital agora mesmo. Oferta válida apenas para 
            os primeiros 100 cadastros desta semana.
          </p>
          
          <div className="space-y-3">
            <Link to="/register" onClick={onClose}>
              <Button className="w-full bg-black hover:bg-gray-900 text-white py-3 text-lg">
                Aproveitar Oferta
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="w-full text-gray-600 hover:text-black"
            >
              Talvez mais tarde
            </Button>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500">
            * Oferta válida até o final desta semana
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromotionalModal;
