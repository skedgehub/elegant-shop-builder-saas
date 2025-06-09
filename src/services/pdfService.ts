
import jsPDF from 'jspdf';

export interface OrderPDFData {
  id: string;
  date: string;
  status: string;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export const generateOrderPDF = (order: OrderPDFData) => {
  const doc = new jsPDF();
  
  // Configurações
  const primaryColor = '#2563eb';
  const grayColor = '#6b7280';
  const darkColor = '#1f2937';
  
  // Header com logo/título
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, 210, 30, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('DETALHES DO PEDIDO', 20, 20);
  
  // Informações do pedido
  let yPos = 50;
  
  doc.setTextColor(31, 41, 55);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Informações do Pedido', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128);
  
  doc.text(`Número do Pedido: ${order.id}`, 20, yPos);
  yPos += 7;
  doc.text(`Data: ${new Date(order.date).toLocaleDateString('pt-BR')}`, 20, yPos);
  yPos += 7;
  doc.text(`Status: ${getStatusLabel(order.status)}`, 20, yPos);
  yPos += 7;
  doc.text(`Total: R$ ${order.total.toFixed(2)}`, 20, yPos);
  
  // Dados do Cliente
  yPos += 20;
  doc.setTextColor(31, 41, 55);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Dados do Cliente', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128);
  
  doc.text(`Nome: ${order.customer.name}`, 20, yPos);
  yPos += 7;
  doc.text(`Email: ${order.customer.email}`, 20, yPos);
  yPos += 7;
  doc.text(`Telefone: ${order.customer.phone}`, 20, yPos);
  yPos += 7;
  
  // Endereço (quebra de linha se necessário)
  const addressLines = doc.splitTextToSize(`Endereço: ${order.customer.address}`, 170);
  doc.text(addressLines, 20, yPos);
  yPos += addressLines.length * 7;
  
  // Itens do Pedido
  yPos += 15;
  doc.setTextColor(31, 41, 55);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Itens do Pedido', 20, yPos);
  
  // Cabeçalho da tabela
  yPos += 15;
  doc.setFillColor(249, 250, 251);
  doc.rect(20, yPos - 5, 170, 10, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(31, 41, 55);
  doc.text('Produto', 25, yPos);
  doc.text('Qtd', 120, yPos);
  doc.text('Preço Unit.', 140, yPos);
  doc.text('Total', 170, yPos);
  
  // Itens
  yPos += 10;
  let subtotal = 0;
  
  order.items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
    if (index % 2 === 0) {
      doc.setFillColor(249, 250, 251);
      doc.rect(20, yPos - 5, 170, 8, 'F');
    }
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 114, 128);
    
    // Nome do produto (com quebra se necessário)
    const productName = doc.splitTextToSize(item.name, 85);
    doc.text(productName, 25, yPos);
    
    doc.text(item.quantity.toString(), 125, yPos);
    doc.text(`R$ ${item.price.toFixed(2)}`, 142, yPos);
    doc.text(`R$ ${itemTotal.toFixed(2)}`, 172, yPos);
    
    yPos += Math.max(8, productName.length * 4);
  });
  
  // Total
  yPos += 10;
  doc.setDrawColor(37, 99, 235);
  doc.line(20, yPos, 190, yPos);
  
  yPos += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(31, 41, 55);
  doc.text(`TOTAL: R$ ${order.total.toFixed(2)}`, 140, yPos);
  
  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128);
  doc.text(`Documento gerado em ${new Date().toLocaleString('pt-BR')}`, 20, pageHeight - 20);
  doc.text('Sistema de Gestão de Pedidos', 20, pageHeight - 15);
  
  // Salvar PDF
  doc.save(`pedido-${order.id}.pdf`);
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending": return "Pendente";
    case "confirmed": return "Confirmado";
    case "preparing": return "Preparando";
    case "shipped": return "Enviado";
    case "delivered": return "Entregue";
    case "cancelled": return "Cancelado";
    default: return "Desconhecido";
  }
};
