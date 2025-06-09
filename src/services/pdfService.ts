
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
  
  // Cores do design system
  const colors = {
    primary: [192, 242, 62], // #C0F23E
    primaryDark: [158, 208, 45], // #9ED02D
    dark: [32, 32, 32], // #202020
    gray: [107, 114, 128],
    lightGray: [249, 250, 251],
    white: [255, 255, 255],
    accent: [59, 130, 246] // Blue accent
  };

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  // Header com gradiente e design moderno
  doc.setFillColor(...colors.primary);
  doc.rect(0, 0, pageWidth, 35, 'F');
  
  // Adicionar subtle pattern no header
  doc.setFillColor(...colors.primaryDark);
  for (let i = 0; i < pageWidth; i += 8) {
    doc.rect(i, 0, 2, 35, 'F');
  }
  
  // Logo/Título principal
  doc.setTextColor(...colors.dark);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('PEDIDO', 20, 22);
  
  // Número do pedido no header
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text(`#${order.id}`, pageWidth - 20, 22, { align: 'right' });
  
  // Status badge
  const statusText = getStatusLabel(order.status);
  const statusColor = getStatusColor(order.status);
  doc.setFillColor(...statusColor);
  doc.roundedRect(pageWidth - 80, 8, 60, 12, 2, 2, 'F');
  doc.setTextColor(...colors.white);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(statusText, pageWidth - 50, 16, { align: 'center' });
  
  let yPos = 55;
  
  // Seção de informações principais com cards
  // Card 1: Informações do Pedido
  doc.setFillColor(...colors.white);
  doc.setDrawColor(...colors.lightGray);
  doc.roundedRect(15, yPos, 85, 45, 3, 3, 'FD');
  
  doc.setTextColor(...colors.dark);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Detalhes do Pedido', 20, yPos + 12);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...colors.gray);
  
  const orderDate = new Date(order.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  
  doc.text(`Data: ${orderDate}`, 20, yPos + 22);
  doc.text(`Pedido: #${order.id}`, 20, yPos + 30);
  
  // Total em destaque
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...colors.primaryDark);
  doc.text(`R$ ${order.total.toFixed(2)}`, 20, yPos + 40);
  
  // Card 2: Dados do Cliente
  doc.setFillColor(...colors.white);
  doc.roundedRect(110, yPos, 85, 45, 3, 3, 'FD');
  
  doc.setTextColor(...colors.dark);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Cliente', 115, yPos + 12);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...colors.gray);
  
  doc.text(order.customer.name, 115, yPos + 22);
  doc.text(order.customer.email, 115, yPos + 29);
  doc.text(order.customer.phone, 115, yPos + 36);
  
  yPos += 65;
  
  // Endereço de entrega
  doc.setFillColor(...colors.lightGray);
  doc.roundedRect(15, yPos, 180, 25, 3, 3, 'F');
  
  doc.setTextColor(...colors.dark);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('📍 Endereço de Entrega', 20, yPos + 10);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...colors.gray);
  const addressLines = doc.splitTextToSize(order.customer.address, 160);
  doc.text(addressLines, 20, yPos + 18);
  
  yPos += 40;
  
  // Tabela de itens com design moderno
  doc.setTextColor(...colors.dark);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Itens do Pedido', 20, yPos);
  
  yPos += 15;
  
  // Header da tabela
  doc.setFillColor(...colors.primary);
  doc.roundedRect(15, yPos - 3, 180, 15, 2, 2, 'F');
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...colors.dark);
  doc.text('Produto', 20, yPos + 6);
  doc.text('Qtd', 130, yPos + 6);
  doc.text('Preço Unit.', 150, yPos + 6);
  doc.text('Total', 175, yPos + 6);
  
  yPos += 20;
  
  // Itens
  order.items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    const isEven = index % 2 === 0;
    
    if (isEven) {
      doc.setFillColor(...colors.lightGray);
      doc.rect(15, yPos - 5, 180, 12, 'F');
    }
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.gray);
    
    // Nome do produto com quebra de linha se necessário
    const productName = doc.splitTextToSize(item.name, 100);
    doc.text(productName, 20, yPos + 2);
    
    doc.text(item.quantity.toString(), 135, yPos + 2);
    doc.text(`R$ ${item.price.toFixed(2)}`, 155, yPos + 2);
    
    // Total do item em destaque
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.dark);
    doc.text(`R$ ${itemTotal.toFixed(2)}`, 180, yPos + 2);
    
    yPos += Math.max(12, productName.length * 4);
  });
  
  // Linha separadora
  yPos += 10;
  doc.setDrawColor(...colors.primary);
  doc.setLineWidth(2);
  doc.line(15, yPos, 195, yPos);
  
  // Total final em destaque
  yPos += 15;
  doc.setFillColor(...colors.primary);
  doc.roundedRect(130, yPos - 5, 65, 20, 3, 3, 'F');
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...colors.dark);
  doc.text('TOTAL GERAL', 135, yPos + 4);
  doc.setFontSize(18);
  doc.text(`R$ ${order.total.toFixed(2)}`, 190, yPos + 9, { align: 'right' });
  
  // Footer moderno
  const footerY = pageHeight - 30;
  doc.setFillColor(...colors.lightGray);
  doc.rect(0, footerY - 5, pageWidth, 40, 'F');
  
  // Logo/Branding no footer
  doc.setFillColor(...colors.primary);
  doc.circle(25, footerY + 8, 8, 'F');
  doc.setTextColor(...colors.dark);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('S', 25, footerY + 10, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text('Sistema de Gestão', 40, footerY + 6);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...colors.gray);
  doc.text('Pedidos & Vendas', 40, footerY + 14);
  
  // Data de geração
  const now = new Date();
  const generatedText = `Documento gerado em ${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR')}`;
  doc.text(generatedText, pageWidth - 20, footerY + 10, { align: 'right' });
  
  // QR Code placeholder (simulado com texto)
  doc.setFillColor(...colors.white);
  doc.rect(pageWidth - 35, footerY - 15, 25, 25, 'FD');
  doc.setFontSize(8);
  doc.setTextColor(...colors.gray);
  doc.text('QR CODE', pageWidth - 22.5, footerY - 2, { align: 'center' });
  doc.text('Tracking', pageWidth - 22.5, footerY + 5, { align: 'center' });
  
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

const getStatusColor = (status: string): [number, number, number] => {
  switch (status) {
    case "pending": return [251, 191, 36]; // Yellow
    case "confirmed": return [59, 130, 246]; // Blue
    case "preparing": return [249, 115, 22]; // Orange
    case "shipped": return [168, 85, 247]; // Purple
    case "delivered": return [34, 197, 94]; // Green
    case "cancelled": return [239, 68, 68]; // Red
    default: return [156, 163, 175]; // Gray
  }
};
