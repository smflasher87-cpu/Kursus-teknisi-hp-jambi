import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Repair Damage Analysis Endpoint
app.post('/api/analyze-repair', async (req, res) => {
  try {
    const { deviceModel, symptoms, usbCurrent, powerSupplyCurrent, pcDetection } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is missing' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
Anda adalah Master Instruktur Teknisi Telepon Seluler Senior di LPK SM FLASHER TRAINING CENTRE.
Analisa data pengukuran ponsel rusak berikut dan berikan diagnosa perbaikan presisi:

- Model HP: ${deviceModel || 'N/A'}
- Gejala Kerusakan: ${symptoms || 'N/A'}
- Arus USB Tester: ${usbCurrent || 'N/A'}
- Arus Power Supply DC: ${powerSupplyCurrent || 'N/A'}
- Detect di Komputer/PC: ${pcDetection || 'N/A'}

Kembalikan jawaban HANYA berupa JSON valid dengan struktur berikut tanpa tag markdown lain:
{
  "verdict": "Kesimpulan diagnosa utama dan jalur terindikasi",
  "suspectedComponents": ["Komponen 1", "Komponen 2", "Komponen 3"],
  "multimeterChecks": [
    {
      "point": "Nama Titik Ukur / Komponen",
      "mode": "Mode Diode" atau "Voltase DC" atau "Resistansi (Ohm)",
      "normalValue": "Nilai standar normal",
      "faultyValue": "Nilai jika rusak/short/drop",
      "actionIfFaulty": "Tindakan perbaikan jika nilai abnormal"
    }
  ],
  "sopSteps": [
    "Langkah 1...",
    "Langkah 2...",
    "Langkah 3..."
  ],
  "blowerSettings": {
    "temperature": "Setelan suhu blower",
    "airFlow": "Setelan angin",
    "note": "Catatan flux & nozzle"
  },
  "confidenceScore": 95
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    const text = response.text || '';
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanJson);

    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error in /api/analyze-repair:', error?.message || error);
    return res.status(500).json({ error: 'Failed to process AI analysis' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
