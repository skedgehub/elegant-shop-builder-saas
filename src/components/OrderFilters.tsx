
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Filter, X, Search } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface OrderFiltersProps {
  onFilterChange: (filters: OrderFilters) => void;
  onSearchChange: (search: string) => void;
  categories: any[];
}

export interface OrderFilters {
  status: string;
  dateFrom: Date | null;
  dateTo: Date | null;
  category: string;
  customerName: string;
}

const OrderFilters = ({ onFilterChange, onSearchChange, categories }: OrderFiltersProps) => {
  const [filters, setFilters] = useState<OrderFilters>({
    status: "",
    dateFrom: null,
    dateTo: null,
    category: "",
    customerName: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: keyof OrderFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  const clearFilters = () => {
    const emptyFilters: OrderFilters = {
      status: "",
      dateFrom: null,
      dateTo: null,
      category: "",
      customerName: ""
    };
    setFilters(emptyFilters);
    setSearchTerm("");
    onFilterChange(emptyFilters);
    onSearchChange("");
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== "" && value !== null
  ) || searchTerm !== "";

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar por ID do pedido, nome do cliente ou email..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros Avançados
          {hasActiveFilters && (
            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
              {Object.values(filters).filter(v => v !== "" && v !== null).length + (searchTerm ? 1 : 0)}
            </span>
          )}
        </Button>
        
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Limpar Filtros
          </Button>
        )}
      </div>

      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros Avançados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="processing">Processando</SelectItem>
                    <SelectItem value="shipped">Enviado</SelectItem>
                    <SelectItem value="delivered">Entregue</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Name Filter */}
              <div>
                <Label htmlFor="customerName">Nome do Cliente</Label>
                <Input
                  id="customerName"
                  placeholder="Buscar por nome..."
                  value={filters.customerName}
                  onChange={(e) => handleFilterChange("customerName", e.target.value)}
                />
              </div>

              {/* Date From */}
              <div>
                <Label>Data Inicial</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateFrom ? format(filters.dateFrom, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.dateFrom || undefined}
                      onSelect={(date) => handleFilterChange("dateFrom", date || null)}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Date To */}
              <div>
                <Label>Data Final</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateTo ? format(filters.dateTo, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.dateTo || undefined}
                      onSelect={(date) => handleFilterChange("dateTo", date || null)}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderFilters;
