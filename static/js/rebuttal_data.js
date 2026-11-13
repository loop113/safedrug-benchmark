// Supplemental evaluations; percentages are stored on a 0–100 scale.
// Population: results/frontier_api/frontier_population_7model.csv plus medical metrics
// Mechanism/evidence/medical: results/rebuttal_experiment_summary.md
// Polypharmacy: results/frontier_api/frontier_poly_balanced_metrics.csv
var REBUTTAL_RESULTS = {
  population: [
    { model: 'Gemini-2.5-Flash', child: 21.64, adult: 31.28, older: 22.94, coverage: null, cohort: 'Original' },
    { model: 'GPT-5-mini', child: 22.60, adult: 38.82, older: 25.30, coverage: null, cohort: 'Original' },
    { model: 'GPT-5.6-Luna', child: 52.94, adult: 74.70, older: 57.02, coverage: null, cohort: 'Supplement' },
    { model: 'DeepSeek-V4-Pro', child: 41.38, adult: 60.80, older: 39.49, coverage: null, cohort: 'Supplement' },
    { model: 'Qwen3.6-Plus', child: 10.33, adult: 48.81, older: 25.92, coverage: null, cohort: 'Supplement' },
    { model: 'GPT-5.6-Sol', child: 54.09, adult: 72.32, older: 57.22, coverage: 99.95, cohort: 'Supplement' },
    { model: 'Kimi-K3', child: 42.06, adult: 63.53, older: 33.97, coverage: 100, cohort: 'Supplement' },
    { model: 'HuatuoGPT', child: 41.92, adult: 61.83, older: 49.54, coverage: null, cohort: 'Medical' },
    { model: 'MedGemma1.5', child: 13.78, adult: 48.28, older: 27.81, coverage: null, cohort: 'Medical' }
  ],
  mechanism: [
    { model: 'DeepSeek-V4-Pro', n: 2000, accuracy: 19.95 },
    { model: 'GPT-5.6-Luna', n: 2000, accuracy: 28.85 },
    { model: 'Qwen3.6-Plus', n: 2000, accuracy: 39.75 },
    { model: 'HuatuoGPT', n: 26022, accuracy: 3.87 },
    { model: 'MedGemma1.5', n: 26022, accuracy: 1.79 }
  ],
  evidence: [
    { model: 'DeepSeek-V4-Pro', selectionF1: 45.33, rougeL: 0.2262, bleu: 5.9483, bertF1: 0.8617, judge: 100 },
    { model: 'GPT-5.6-Luna', selectionF1: 52.43, rougeL: 0.1378, bleu: 2.4609, bertF1: 0.8463, judge: 90.63 },
    { model: 'Qwen3.6-Plus', selectionF1: 48.56, rougeL: 0.1689, bleu: 2.9307, bertF1: 0.8470, judge: 100 },
    { model: 'HuatuoGPT', selectionF1: null, rougeL: 0.1203, bleu: 2.6615, bertF1: 0.8430, judge: 9.38 },
    { model: 'MedGemma1.5', selectionF1: null, rougeL: 0.2221, bleu: 4.7196, bertF1: 0.8547, judge: 56.25 }
  ],
  medicalReplacement: [
    { model: 'HuatuoGPT', exact: 58.49 },
    { model: 'MedGemma1.5', exact: 50.39 }
  ],
  polyRisk: [
    { model: 'GPT-5.6-Luna', drugs: 3, n: 2000, accuracy: 47.35, balanced: 57.84, macroF1: 47.01 },
    { model: 'GPT-5.6-Luna', drugs: 4, n: 2000, accuracy: 48.40, balanced: 61.09, macroF1: 48.37 },
    { model: 'GPT-5.6-Luna', drugs: 5, n: 2000, accuracy: 48.55, balanced: 64.05, macroF1: 45.53 },
    { model: 'GPT-5.6-Luna', drugs: 6, n: 824, accuracy: 48.18, balanced: 63.72, macroF1: 40.44 },
    { model: 'GPT-5.6-Luna', drugs: 7, n: 418, accuracy: 48.09, balanced: 65.91, macroF1: 38.50 },
    { model: 'GPT-5.6-Luna', drugs: 8, n: 254, accuracy: 44.88, balanced: 71.43, macroF1: 35.70 },
    { model: 'GPT-5.6-Luna', drugs: 9, n: 144, accuracy: 48.61, balanced: 57.45, macroF1: 34.95 },
    { model: 'GPT-5.6-Luna', drugs: 10, n: 84, accuracy: 61.90, balanced: 64.20, macroF1: 43.43 },
    { model: 'DeepSeek-V4-Pro', drugs: 3, n: 2000, accuracy: 53.90, balanced: 57.28, macroF1: 53.29 },
    { model: 'DeepSeek-V4-Pro', drugs: 4, n: 2000, accuracy: 58.30, balanced: 61.61, macroF1: 56.12 },
    { model: 'DeepSeek-V4-Pro', drugs: 5, n: 2000, accuracy: 60.10, balanced: 59.40, macroF1: 51.00 },
    { model: 'DeepSeek-V4-Pro', drugs: 6, n: 824, accuracy: 63.71, balanced: 65.32, macroF1: 48.96 },
    { model: 'DeepSeek-V4-Pro', drugs: 7, n: 418, accuracy: 65.31, balanced: 68.21, macroF1: 47.60 },
    { model: 'DeepSeek-V4-Pro', drugs: 8, n: 254, accuracy: 70.87, balanced: 68.84, macroF1: 48.21 },
    { model: 'DeepSeek-V4-Pro', drugs: 9, n: 144, accuracy: 59.03, balanced: 46.45, macroF1: 38.64 },
    { model: 'DeepSeek-V4-Pro', drugs: 10, n: 84, accuracy: 71.43, balanced: 53.09, macroF1: 45.40 },
    { model: 'Qwen3.6-Plus', drugs: 3, n: 2000, accuracy: 42.45, balanced: 55.95, macroF1: 40.73 },
    { model: 'Qwen3.6-Plus', drugs: 4, n: 2000, accuracy: 41.50, balanced: 58.44, macroF1: 41.13 },
    { model: 'Qwen3.6-Plus', drugs: 5, n: 2000, accuracy: 37.55, balanced: 61.32, macroF1: 36.93 },
    { model: 'Qwen3.6-Plus', drugs: 6, n: 824, accuracy: 34.71, balanced: 60.97, macroF1: 31.66 },
    { model: 'Qwen3.6-Plus', drugs: 7, n: 418, accuracy: 37.32, balanced: 64.75, macroF1: 32.09 },
    { model: 'Qwen3.6-Plus', drugs: 8, n: 254, accuracy: 30.31, balanced: 63.88, macroF1: 26.34 },
    { model: 'Qwen3.6-Plus', drugs: 9, n: 144, accuracy: 31.94, balanced: 48.94, macroF1: 25.62 },
    { model: 'Qwen3.6-Plus', drugs: 10, n: 84, accuracy: 42.86, balanced: 70.37, macroF1: 34.50 }
  ],
  sources: {
    population: 'results/frontier_api/frontier_population_7model.csv; results/rebuttal_experiment_summary.md',
    polyRisk: 'results/frontier_api/frontier_poly_balanced_metrics.csv',
    mechanismEvidenceMedical: 'results/rebuttal_experiment_summary.md',
    stability: 'results/small_source_stability/full/aggregate/stability_summary.csv'
  }
};
