
import jsPDF from 'jspdf';

export const generateOrderPDF = (order: any) => {
  const doc = new jsPDF();

  // Configurações de cores - convertendo para formato RGB (0-1)
  const primaryColor = [192/255, 242/255, 62/255]; // #C0F23E
  const grayColor = [107/255, 114/255, 128/255]; // #6b7280
  const darkColor = [31/255, 41/255, 55/255]; // #1f2937
  const whiteColor = [1, 1, 1];
  const lightGrayColor = [249/255, 250/255, 251/255]; // #f9fafb

  // Header com gradiente e logo
  doc.setFillColor(darkColor[0] * 255, darkColor[1] * 255, darkColor[2] * 255);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Accent bar
  doc.setFillColor(primaryColor[0] * 255, primaryColor[1] * 255, primaryColor[2] * 255);
  doc.rect(0, 0, 210, 4, 'F');

  // Logo/Título
  doc.setTextColor(whiteColor[0] * 255, whiteColor[1] * 255, whiteColor[2] * 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('CATALOGO PRO', 20, 20);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Sistema de Gestão de Pedidos', 20, 30);

  // Card com informações do pedido
  let yPos = 60;
  
  // Fundo do card
  doc.setFillColor(lightGrayColor[0] * 255, lightGrayColor[1] * 255, lightGrayColor[2] * 255);
  doc.roundedRect(15, yPos - 10, 180, 35, 3, 3, 'F');
  
  doc.setTextColor(darkColor[0] * 255, darkColor[1] * 255, darkColor[2] * 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('DETALHES DO PEDIDO', 20, yPos);
  
  yPos += 15;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(grayColor[0] * 255, grayColor[1] * 255, grayColor[2] * 255);
  
  const orderInfo = [
    `Número: ${order.id}`,
    `Data: ${new Date(order.date).toLocaleDateString('pt-BR')}`,
    `Status: ${getStatusLabel(order.status)}`,
    `Total: R$ ${order.total.toFixed(2)}`
  ];
  
  orderInfo.forEach((info, index) => {
    doc.text(info, 20 + (index % 2) * 85, yPos + Math.floor(index / 2) * 8);
  });

  // Dados do Cliente
  yPos += 35;
  doc.setFillColor(lightGrayColor[0] * 255, lightGrayColor[1] * 255, lightGrayColor[2] * 255);
  doc.roundedRect(15, yPos - 5, 180, 40, 3, 3, 'F');
  
  doc.setTextColor(darkColor[0] * 255, darkColor[1] * 255, darkColor[2] * 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('CLIENTE', 20, yPos + 5);
  
  yPos += 15;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(grayColor[0] * 255, grayColor[1] * 255, grayColor[2] * 255);
  
  doc.text(`Nome: ${order.customer.name}`, 20, yPos);
  yPos += 6;
  doc.text(`Email: ${order.customer.email}`, 20, yPos);
  yPos += 6;
  doc.text(`Telefone: ${order.customer.phone}`, 20, yPos);
  yPos += 6;
  
  const addressLines = doc.splitTextToSize(`Endereço: ${order.customer.address}`, 170);
  doc.text(addressLines, 20, yPos);
  yPos += addressLines.length * 6;

  // Itens do Pedido
  yPos += 20;
  doc.setTextColor(darkColor[0] * 255, darkColor[1] * 255, darkColor[2] * 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('ITENS DO PEDIDO', 20, yPos);
  
  // Header da tabela
  yPos += 15;
  doc.setFillColor(primaryColor[0] * 255, primaryColor[1] * 255, primaryColor[2] * 255);
  doc.roundedRect(15, yPos - 8, 180, 12, 2, 2, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkColor[0] * 255, darkColor[1] * 255, darkColor[2] * 255);
  doc.text('PRODUTO', 20, yPos - 2);
  doc.text('QTD', 120, yPos - 2);
  doc.text('PREÇO', 140, yPos - 2);
  doc.text('TOTAL', 170, yPos - 2);

  // Itens
  yPos += 8;
  order.items.forEach((item: any, index: number) => {
    const itemTotal = item.price * item.quantity;
    
    if (index % 2 === 0) {
      doc.setFillColor(lightGrayColor[0] * 255, lightGrayColor[1] * 255, lightGrayColor[2] * 255);
      doc.rect(15, yPos - 4, 180, 10, 'F');
    }
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(grayColor[0] * 255, grayColor[1] * 255, grayColor[2] * 255);
    
    const productName = doc.splitTextToSize(item.name, 90);
    doc.text(productName, 20, yPos);
    doc.text(item.quantity.toString(), 125, yPos);
    doc.text(`R$ ${item.price.toFixed(2)}`, 142, yPos);
    doc.text(`R$ ${itemTotal.toFixed(2)}`, 172, yPos);
    
    yPos += Math.max(10, productName.length * 4);
  });

  // Total Final
  yPos += 15;
  doc.setFillColor(darkColor[0] * 255, darkColor[1] * 255, darkColor[2] * 255);
  doc.roundedRect(120, yPos - 8, 75, 20, 3, 3, 'F');
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(whiteColor[0] * 255, whiteColor[1] * 255, whiteColor[2] * 255);
  doc.text(`TOTAL: R$ ${order.total.toFixed(2)}`, 125, yPos);

  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setDrawColor(primaryColor[0] * 255, primaryColor[1] * 255, primaryColor[2] * 255);
  doc.setLineWidth(1);
  doc.line(20, pageHeight - 30, 190, pageHeight - 30);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(grayColor[0] * 255, grayColor[1] * 255, grayColor[2] * 255);
  doc.text(`Documento gerado em ${new Date().toLocaleString('pt-BR')}`, 20, pageHeight - 20);
  doc.text('CatalogoPro - Sistema de Catálogo SaaS', 20, pageHeight - 15);
  doc.text('www.catalogopro.com', 20, pageHeight - 10);

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
