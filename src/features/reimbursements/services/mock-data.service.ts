/**
 * Serviço de Dados Mockados
 *
 * Gera dados de exemplo para desenvolvimento e testes
 */

import { Reimbursement } from "../../../shared/types";

/**
 * Cria um PDF mockado em formato data URL
 * @returns Promise com data URL do PDF
 */
const createMockPdfDataUrl = (): Promise<string> => {
  const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 4 0 R
>>
>>
/MediaBox [0 0 612 792]
/Contents 5 0 R
>>
endobj
4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj
5 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(Comprovante de Reembolso) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000262 00000 n
0000000341 00000 n
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
433
%%EOF`;

  const blob = new Blob([pdfContent], { type: "application/pdf" });
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
};

/**
 * Serviço de dados mockados
 */
export const mockDataService = {
  /**
   * Gera dados mockados de reembolsos
   * @returns Promise com array de reembolsos mockados
   */
  generateMockData: async (): Promise<Reimbursement[]> => {
    const pdfDataUrl = await createMockPdfDataUrl();

    return [
      {
        id: "1",
        name: "Rodrigo",
        category: "Alimentação",
        amount: 34.78,
        receipt: pdfDataUrl,
        receiptName: "recibo-alimentacao.pdf",
        createdAt: new Date("2024-01-15").toISOString(),
      },
      {
        id: "2",
        name: "Tamires",
        category: "Hospedagem",
        amount: 1200.0,
        receipt: pdfDataUrl,
        receiptName: "recibo-hospedagem.pdf",
        createdAt: new Date("2024-01-14").toISOString(),
      },
      {
        id: "3",
        name: "Lara",
        category: "Alimentação",
        amount: 12.35,
        receipt: pdfDataUrl,
        receiptName: "recibo-lanche.pdf",
        createdAt: new Date("2024-01-13").toISOString(),
      },
      {
        id: "4",
        name: "Elias",
        category: "Transporte",
        amount: 47.65,
        receipt: pdfDataUrl,
        receiptName: "recibo-uber.pdf",
        createdAt: new Date("2024-01-12").toISOString(),
      },
      {
        id: "5",
        name: "Thiago",
        category: "Serviços",
        amount: 99.9,
        receipt: pdfDataUrl,
        receiptName: "recibo-servico.pdf",
        createdAt: new Date("2024-01-11").toISOString(),
      },
      {
        id: "6",
        name: "Vinicius",
        category: "Outros",
        amount: 25.89,
        receipt: pdfDataUrl,
        receiptName: "recibo-outros.pdf",
        createdAt: new Date("2024-01-10").toISOString(),
      },
    ];
  },
};
