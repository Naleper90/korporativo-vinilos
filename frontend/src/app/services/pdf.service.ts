import { Injectable } from '@angular/core';

// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = (pdfFonts as any).pdfMake
  ? (pdfFonts as any).pdfMake.vfs
  : (pdfFonts as any).vfs;

export interface BudgetPDFData {
  id: number;
  anchoCm: number;
  altoCm: number;
  tipoVinilo: string;
  tipoCorte: string;
  tipoAdhesivo: string;
  incluirInstalacion: boolean;
  incluirIva: boolean;
  pais: string;
  precioFinal: number;
  precioBase?: number;
  createdAt?: string;
  clientName?: string;
  clientEmail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  generateBudgetPDF(budget: BudgetPDFData) {
    const area = (budget.anchoCm * budget.altoCm) / 10000;
    const fecha = budget.createdAt
      ? new Date(budget.createdAt).toLocaleDateString('es-ES')
      : new Date().toLocaleDateString('es-ES');

    const materialesMap: Record<string, string> = {
      monomerico: 'Vinilo Monomérico',
      polimerico: 'Vinilo Polimérico',
      transparente: 'Vinilo Transparente',
      microperforado: 'Vinilo Microperforado'
    };
    const corteMap: Record<string, string> = { recto: 'Corte Recto', contorno: 'Corte Contorno' };
    const adhesivoMap: Record<string, string> = { normal: 'Adhesivo Normal', extra: 'Adhesivo Extra' };

    const paisMap: Record<string, string> = {
      ES: 'España (21% IVA)',
      PT: 'Portugal (23% IVA)',
      CANARIAS: 'Canarias (Sin IVA)'
    };

    const precioBase = budget.precioBase || this.calcularPrecioBase(budget);
    const iva = budget.pais === 'CANARIAS' || !budget.incluirIva
      ? 0
      : this.calcularIVA(precioBase, budget.pais);

    const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 40, 40, 40],
      content: [
        {
          columns: [
            { text: 'PRESUPUESTO', fontSize: 24, bold: true, color: '#b3e03d' },
            { text: `#${budget.id}`, fontSize: 14, color: '#666', alignment: 'right' }
          ],
          marginBottom: 10
        },
        { text: '━'.repeat(80), marginBottom: 20, color: '#ddd' },
        {
          text: `Generado el ${fecha}`,
          fontSize: 10,
          alignment: 'right',
          marginBottom: 20
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto'],
            body: [
              [
                { text: 'Descripción', bold: true, fillColor: '#eeeeee' },
                { text: 'Cantidad', bold: true, fillColor: '#eeeeee' },
                { text: 'Total', bold: true, fillColor: '#eeeeee' }
              ],
              [
                {
                  stack: [
                    { text: materialesMap[budget.tipoVinilo] || budget.tipoVinilo, bold: true },
                    { text: `${budget.anchoCm} x ${budget.altoCm} cm (${area.toFixed(2)} m²)`, fontSize: 10, color: '#555' },
                    { text: `Corte: ${corteMap[budget.tipoCorte] || budget.tipoCorte}`, fontSize: 10, color: '#555' },
                    { text: `Adhesivo: ${adhesivoMap[budget.tipoAdhesivo] || budget.tipoAdhesivo}`, fontSize: 10, color: '#555' },
                    { text: `Destino: ${paisMap[budget.pais] || budget.pais}`, fontSize: 10, color: '#555' }
                  ]
                },
                '1',
                `${precioBase.toFixed(2)} €`
              ],
              budget.incluirInstalacion ? [
                'Servicio de Instalación Profesional',
                '1',
                '50.00 €'
              ] : []
            ].filter(row => row.length > 0)
          },
          marginBottom: 20
        },
        {
          alignment: 'right',
          columns: [
            { text: '' },
            {
              width: 'auto',
              table: {
                widths: [100, 80],
                body: [
                  ['Subtotal:', `${precioBase.toFixed(2)} €`],
                  [`IVA (${this.getIVAPercentage(budget.pais)}%):`, `${iva.toFixed(2)} €`],
                  [
                    { text: 'TOTAL:', bold: true, fontSize: 12 },
                    { text: `${budget.precioFinal.toFixed(2)} €`, bold: true, fontSize: 12, color: '#b3e03d' }
                  ]
                ]
              },
              layout: 'noBorders'
            }
          ]
        },
        {
          text: 'Gracias por su confianza. Presupuesto válido por 30 días.',
          style: 'footer',
          alignment: 'center',
          marginTop: 50,
          color: '#888',
          fontSize: 9
        }
      ]
    };

    pdfMake.createPdf(docDefinition).download(`presupuesto-${budget.id}.pdf`);
  }

  private calcularPrecioBase(budget: BudgetPDFData): number {
    const PRECIO_BASE_CM2 = 0.05;
    const area = budget.anchoCm * budget.altoCm;
    let factor = 1;
    if (budget.tipoVinilo === 'polimerico') factor = 1.5;
    if (budget.tipoVinilo === 'transparente') factor = 1.2;
    if (budget.tipoVinilo === 'microperforado') factor = 1.3;
    if (budget.tipoCorte === 'contorno') factor *= 1.10;
    if (budget.tipoAdhesivo === 'extra') factor *= 1.20;
    let total = area * PRECIO_BASE_CM2 * factor;
    if (budget.incluirInstalacion) total += 50;
    return total;
  }

  private calcularIVA(precioBase: number, pais: string): number {
    const iva = this.getIVAPercentage(pais) / 100;
    return precioBase * iva;
  }

  private getIVAPercentage(pais: string): number {
    switch (pais) {
      case 'ES': return 21;
      case 'PT': return 23;
      case 'CANARIAS': return 0;
      default: return 21;
    }
  }
}
