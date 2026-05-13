// SafeDrug Benchmark - Leaderboard Data

// ============================================================
// LARGE BENCHMARK - Exact Match (EM%) on Test Set
// ============================================================

var LARGE_MODELS = [
  'qwen2.5:7b',
  'qwen2.5:3b',
  'llama3.1:8b',
  'llama3.2:3b',
  'deepseek-v3',
  'gpt-4o-mini',
  'gemini-2.5-flash',
  'qwen3-235b-a22b',
  'gpt-5-mini'
];

var LARGE_TASKS = [
  { id: 'child', name: 'ADE - Child', category: 'ADE Prediction' },
  { id: 'adult', name: 'ADE - Adult', category: 'ADE Prediction' },
  { id: 'older_adult', name: 'ADE - Older Adult', category: 'ADE Prediction' },
  { id: 'ade_prediction', name: 'ADE Overall', category: 'ADE Prediction' },
  { id: 'ade_risk', name: 'ADE Risk', category: 'ADE Risk Prediction' },
  { id: 'ddi_prediction', name: 'DDI Type', category: 'DDI Prediction' },
  { id: 'ddi_risk', name: 'DDI Severity', category: 'DDI Risk Prediction' },
  { id: 'mechanism', name: 'Mechanism', category: 'Mechanism Prediction' },
  { id: 'substitution', name: 'Substitution', category: 'Substitution Prediction' },
  { id: 'multi_ddi_3', name: 'Multi DDI (3)', category: 'Multiple Drug Prediction' },
  { id: 'multi_ddi_4', name: 'Multi DDI (4)', category: 'Multiple Drug Prediction' },
  { id: 'multi_ddi_5', name: 'Multi DDI (5)', category: 'Multiple Drug Prediction' },
  { id: 'multi_ddi_10', name: 'Multi DDI (10)', category: 'Multiple Drug Prediction' },
  { id: 'multi_risk_3', name: 'Multi Risk (3)', category: 'Multiple Drug Prediction' },
  { id: 'multi_risk_4', name: 'Multi Risk (4)', category: 'Multiple Drug Prediction' },
  { id: 'multi_risk_5', name: 'Multi Risk (5)', category: 'Multiple Drug Prediction' },
  { id: 'multi_risk_10', name: 'Multi Risk (10)', category: 'Multiple Drug Prediction' }
];

// EM% values: rows = models (same order as LARGE_MODELS), cols = tasks (same order as LARGE_TASKS)
var LARGE_DATA = [
  // qwen2.5:7b
  [2.02, 18.02, 6.68, 15.73, 29.53, 28.16, 42.55, 23.28, 68.42, 47.11, 48.60, 53.13, 65.29, 42.83, 38.66, 39.27, 45.24],
  // qwen2.5:3b
  [10.32, 21.79, 12.56, 13.90, 12.39, 21.42, 29.31, 42.49, 60.34, 57.60, 63.30, 66.42, 69.42, 68.33, 74.71, 84.83, 95.24],
  // llama3.1:8b
  [13.46, 23.51, 15.27, 3.06, 32.94, 28.96, 47.15, 4.22, 66.40, 41.25, 45.05, 52.30, 43.80, 37.39, 32.25, 28.20, 21.43],
  // llama3.2:3b
  [7.00, 6.80, 5.96, 14.78, 12.85, 29.82, 40.36, 5.02, 59.40, 40.32, 51.94, 61.64, 65.29, 58.93, 58.42, 62.45, 66.67],
  // deepseek-v3
  [9.67, 30.14, 12.92, 23.15, 29.77, 26.96, 35.12, 29.23, 59.90, 60.34, 64.59, 65.76, 66.11, 63.98, 69.96, 76.04, 91.66],
  // gpt-4o-mini
  [8.07, 28.09, 18.61, 13.49, 25.49, 29.29, 47.43, 31.04, 68.06, 43.74, 48.83, 52.08, 51.23, 46.21, 45.57, 46.42, 57.14],
  // gemini-2.5-flash
  [21.64, 31.28, 22.94, 10.90, 38.10, 63.55, 35.60, 21.70, 78.85, 62.60, 65.05, 65.90, 66.11, 65.20, 71.60, 80.20, 94.04],
  // qwen3-235b-a22b
  [17.26, 34.15, 22.40, 11.05, 25.10, 32.55, 29.00, 27.00, 75.70, 56.75, 59.80, 62.60, 64.46, 61.20, 67.45, 70.45, 89.28],
  // gpt-5-mini
  [22.60, 38.82, 25.30, 8.25, 27.00, 57.60, 48.90, 24.60, 78.80, 58.65, 63.45, 65.05, 66.11, 50.35, 53.05, 56.65, 69.04]
];

// ============================================================
// SMALL BENCHMARK - DDI Agent Evaluation (Test Set)
// ============================================================

var SMALL_MODELS = [
  'deepseek-v3',
  'gemini-2.5-flash',
  'gpt-4o-mini',
  'gpt-5-mini',
  'qwen3-235b-a22b',
  'llama3.1:8b',
  'llama3.2:3b',
  'qwen2.5:3b',
  'qwen2.5:7b'
];

// 'proprietary' or 'open-source'
var SMALL_MODEL_GROUPS = [
  'proprietary', 'proprietary', 'proprietary', 'proprietary', 'proprietary',
  'open-source', 'open-source', 'open-source', 'open-source'
];

var SMALL_TASKS = [
  {
    id: 'interaction_check',
    name: 'Interaction Check',
    format: 'classification',
    metrics: ['Accuracy', 'Macro-F1', 'Macro-Precision', 'Macro-Recall']
  },
  {
    id: 'severity_classification',
    name: 'Severity Classification',
    format: 'classification',
    metrics: ['Accuracy', 'Macro-F1', 'Macro-Precision', 'Macro-Recall']
  },
  {
    id: 'interaction_type_classification',
    name: 'Interaction Type',
    format: 'classification',
    metrics: ['Accuracy', 'Macro-F1', 'Macro-Precision', 'Macro-Recall']
  },
  {
    id: 'risk_label_selection',
    name: 'Risk Label Selection',
    format: 'multi_label',
    metrics: ['Exact Match', 'Partial Match', 'Set-F1']
  },
  {
    id: 'management_action_classification',
    name: 'Management Action',
    format: 'multi_label',
    metrics: ['Exact Match', 'Partial Match', 'Set-F1']
  },
  {
    id: 'alternative_drug_selection',
    name: 'Alternative Drug Selection',
    format: 'multi_choice',
    metrics: ['Exact Match', 'Partial Match', 'Set-F1']
  },
  {
    id: 'evidence_selection',
    name: 'Evidence Selection',
    format: 'multi_choice',
    metrics: ['Exact Match', 'Partial Match', 'Set-F1']
  },
  {
    id: 'mechanism_span_selection',
    name: 'Mechanism Span',
    format: 'single_span_selection',
    metrics: ['Accuracy', 'Macro-F1', 'Macro-Precision', 'Macro-Recall']
  },
  {
    id: 'management_rationale_selection',
    name: 'Management Rationale',
    format: 'single_span_selection',
    metrics: ['Accuracy', 'Macro-F1', 'Macro-Precision', 'Macro-Recall']
  },
  {
    id: 'mechanism_reasoning',
    name: 'Mechanism Reasoning',
    format: 'generation',
    metrics: ['LLM-Judge Pass Rate']
  },
  {
    id: 'evidence_reasoning',
    name: 'Evidence Reasoning',
    format: 'generation',
    metrics: ['LLM-Judge Pass Rate']
  }
];

// Small benchmark data [task_idx][model_idx] = { metric_name: value, ... }
var SMALL_DATA = {
  'interaction_check': [
    { 'Accuracy': 0.6349, 'Macro-F1': 0.4137, 'Macro-Precision': 0.4549, 'Macro-Recall': 0.4257 },     // deepseek-v3
    { 'Accuracy': 0.5079, 'Macro-F1': 0.4013, 'Macro-Precision': 0.5053, 'Macro-Recall': 0.3380 },     // gemini-2.5-flash
    { 'Accuracy': 0.5873, 'Macro-F1': 0.5625, 'Macro-Precision': 0.6203, 'Macro-Recall': 0.5912 },     // gpt-4o-mini
    { 'Accuracy': 0.7460, 'Macro-F1': 0.7460, 'Macro-Precision': 0.7470, 'Macro-Recall': 0.7465 },     // gpt-5-mini
    { 'Accuracy': 0.6349, 'Macro-F1': 0.6346, 'Macro-Precision': 0.6348, 'Macro-Recall': 0.6346 },     // qwen3-235b-a22b
    { 'Accuracy': 0.5873, 'Macro-F1': 0.5821, 'Macro-Precision': 0.5946, 'Macro-Recall': 0.5892 },     // llama3.1:8b
    { 'Accuracy': 0.5079, 'Macro-F1': 0.3636, 'Macro-Precision': 0.7500, 'Macro-Recall': 0.5156 },     // llama3.2:3b
    { 'Accuracy': 0.5397, 'Macro-F1': 0.5378, 'Macro-Precision': 0.5393, 'Macro-Recall': 0.5388 },     // qwen2.5:3b
    { 'Accuracy': 0.6508, 'Macro-F1': 0.6464, 'Macro-Precision': 0.6619, 'Macro-Recall': 0.6527 }      // qwen2.5:7b
  ],
  'severity_classification': [
    { 'Accuracy': 0.4062, 'Macro-F1': 0.2546, 'Macro-Precision': 0.2500, 'Macro-Recall': 0.2612 },
    { 'Accuracy': 0.3438, 'Macro-F1': 0.2152, 'Macro-Precision': 0.2750, 'Macro-Recall': 0.1769 },
    { 'Accuracy': 0.4062, 'Macro-F1': 0.2867, 'Macro-Precision': 0.3421, 'Macro-Recall': 0.2745 },
    { 'Accuracy': 0.5625, 'Macro-F1': 0.3701, 'Macro-Precision': 0.4195, 'Macro-Recall': 0.3771 },
    { 'Accuracy': 0.4375, 'Macro-F1': 0.2509, 'Macro-Precision': 0.3696, 'Macro-Recall': 0.2869 },
    { 'Accuracy': 0.3750, 'Macro-F1': 0.3744, 'Macro-Precision': 0.4016, 'Macro-Recall': 0.3843 },
    { 'Accuracy': 0.4375, 'Macro-F1': 0.2483, 'Macro-Precision': 0.4731, 'Macro-Recall': 0.3611 },
    { 'Accuracy': 0.0625, 'Macro-F1': 0.0680, 'Macro-Precision': 0.0857, 'Macro-Recall': 0.0565 },
    { 'Accuracy': 0.4062, 'Macro-F1': 0.2993, 'Macro-Precision': 0.3258, 'Macro-Recall': 0.2777 }
  ],
  'interaction_type_classification': [
    { 'Accuracy': 0.4062, 'Macro-F1': 0.2463, 'Macro-Precision': 0.3670, 'Macro-Recall': 0.2288 },
    { 'Accuracy': 0.2500, 'Macro-F1': 0.1245, 'Macro-Precision': 0.2262, 'Macro-Recall': 0.1000 },
    { 'Accuracy': 0.3125, 'Macro-F1': 0.1771, 'Macro-Precision': 0.2500, 'Macro-Recall': 0.1627 },
    { 'Accuracy': 0.7812, 'Macro-F1': 0.4135, 'Macro-Precision': 0.4351, 'Macro-Recall': 0.4095 },
    { 'Accuracy': 0.5000, 'Macro-F1': 0.2798, 'Macro-Precision': 0.3571, 'Macro-Recall': 0.2718 },
    { 'Accuracy': 0.1250, 'Macro-F1': 0.0533, 'Macro-Precision': 0.0392, 'Macro-Recall': 0.0833 },
    { 'Accuracy': 0.0312, 'Macro-F1': 0.0101, 'Macro-Precision': 0.0052, 'Macro-Recall': 0.1667 },
    { 'Accuracy': 0.3125, 'Macro-F1': 0.1299, 'Macro-Precision': 0.1175, 'Macro-Recall': 0.1833 },
    { 'Accuracy': 0.2812, 'Macro-F1': 0.1078, 'Macro-Precision': 0.0993, 'Macro-Recall': 0.1286 }
  ],
  'risk_label_selection': [
    { 'Exact Match': 0.2500, 'Partial Match': 0.6875, 'Set-F1': 0.4844 },
    { 'Exact Match': 0.0625, 'Partial Match': 0.3750, 'Set-F1': 0.2594 },
    { 'Exact Match': 0.1562, 'Partial Match': 0.5938, 'Set-F1': 0.4283 },
    { 'Exact Match': 0.1875, 'Partial Match': 0.6562, 'Set-F1': 0.4844 },
    { 'Exact Match': 0.0938, 'Partial Match': 0.6562, 'Set-F1': 0.4115 },
    { 'Exact Match': 0.0000, 'Partial Match': 0.7500, 'Set-F1': 0.4521 },
    { 'Exact Match': 0.0312, 'Partial Match': 0.2500, 'Set-F1': 0.1750 },
    { 'Exact Match': 0.0312, 'Partial Match': 0.3125, 'Set-F1': 0.2052 },
    { 'Exact Match': 0.0312, 'Partial Match': 0.5938, 'Set-F1': 0.4021 }
  ],
  'management_action_classification': [
    { 'Exact Match': 0.1250, 'Partial Match': 0.7500, 'Set-F1': 0.5178 },
    { 'Exact Match': 0.0312, 'Partial Match': 0.3438, 'Set-F1': 0.2125 },
    { 'Exact Match': 0.0312, 'Partial Match': 0.8125, 'Set-F1': 0.4579 },
    { 'Exact Match': 0.1562, 'Partial Match': 0.7500, 'Set-F1': 0.5667 },
    { 'Exact Match': 0.0312, 'Partial Match': 0.7500, 'Set-F1': 0.3937 },
    { 'Exact Match': 0.0000, 'Partial Match': 1.0000, 'Set-F1': 0.4851 },
    { 'Exact Match': 0.0000, 'Partial Match': 0.7188, 'Set-F1': 0.4571 },
    { 'Exact Match': 0.0000, 'Partial Match': 1.0000, 'Set-F1': 0.4816 },
    { 'Exact Match': 0.0312, 'Partial Match': 0.7500, 'Set-F1': 0.4882 }
  ],
  'alternative_drug_selection': [
    { 'Exact Match': 0.2545, 'Partial Match': 0.9636, 'Set-F1': 0.7026 },
    { 'Exact Match': 0.0545, 'Partial Match': 0.6000, 'Set-F1': 0.2696 },
    { 'Exact Match': 0.1636, 'Partial Match': 0.9273, 'Set-F1': 0.5729 },
    { 'Exact Match': 0.2182, 'Partial Match': 0.9818, 'Set-F1': 0.6644 },
    { 'Exact Match': 0.2364, 'Partial Match': 0.9273, 'Set-F1': 0.6756 },
    { 'Exact Match': 0.1273, 'Partial Match': 0.9818, 'Set-F1': 0.5474 },
    { 'Exact Match': 0.0000, 'Partial Match': 1.0000, 'Set-F1': 0.5343 },
    { 'Exact Match': 0.1091, 'Partial Match': 0.8000, 'Set-F1': 0.3905 },
    { 'Exact Match': 0.2182, 'Partial Match': 0.9636, 'Set-F1': 0.5980 }
  ],
  'evidence_selection': [
    { 'Exact Match': 0.0000, 'Partial Match': 0.9688, 'Set-F1': 0.4354 },
    { 'Exact Match': 0.0000, 'Partial Match': 0.4062, 'Set-F1': 0.2156 },
    { 'Exact Match': 0.0000, 'Partial Match': 0.9062, 'Set-F1': 0.3955 },
    { 'Exact Match': 0.0000, 'Partial Match': 0.9375, 'Set-F1': 0.5521 },
    { 'Exact Match': 0.0000, 'Partial Match': 0.9062, 'Set-F1': 0.5326 },
    { 'Exact Match': 0.0000, 'Partial Match': 1.0000, 'Set-F1': 0.5156 },
    { 'Exact Match': 0.0000, 'Partial Match': 1.0000, 'Set-F1': 0.4490 },
    { 'Exact Match': 0.0000, 'Partial Match': 0.9062, 'Set-F1': 0.4470 },
    { 'Exact Match': 0.0000, 'Partial Match': 0.7812, 'Set-F1': 0.3480 }
  ],
  'mechanism_span_selection': [
    { 'Accuracy': 0.1562, 'Macro-F1': 0.1351, 'Macro-Precision': 0.5000, 'Macro-Recall': 0.0781 },
    { 'Accuracy': 0.3125, 'Macro-F1': 0.1587, 'Macro-Precision': 0.3333, 'Macro-Recall': 0.1042 },
    { 'Accuracy': 0.2812, 'Macro-F1': 0.2195, 'Macro-Precision': 0.5000, 'Macro-Recall': 0.1406 },
    { 'Accuracy': 0.3438, 'Macro-F1': 0.1705, 'Macro-Precision': 0.3333, 'Macro-Recall': 0.1146 },
    { 'Accuracy': 0.1562, 'Macro-F1': 0.1351, 'Macro-Precision': 0.5000, 'Macro-Recall': 0.0781 },
    { 'Accuracy': 0.1250, 'Macro-F1': 0.1111, 'Macro-Precision': 0.5000, 'Macro-Recall': 0.0625 },
    { 'Accuracy': 0.1875, 'Macro-F1': 0.1579, 'Macro-Precision': 0.5000, 'Macro-Recall': 0.0938 },
    { 'Accuracy': 0.1250, 'Macro-F1': 0.0741, 'Macro-Precision': 0.3333, 'Macro-Recall': 0.0417 },
    { 'Accuracy': 0.4062, 'Macro-F1': 0.2889, 'Macro-Precision': 0.5000, 'Macro-Recall': 0.2031 }
  ],
  'management_rationale_selection': [
    { 'Accuracy': 0.0312, 'Macro-F1': 0.0202, 'Macro-Precision': 0.3333, 'Macro-Recall': 0.0104 },
    { 'Accuracy': 0.1562, 'Macro-F1': 0.0676, 'Macro-Precision': 0.2500, 'Macro-Recall': 0.0391 },
    { 'Accuracy': 0.0625, 'Macro-F1': 0.0392, 'Macro-Precision': 0.3333, 'Macro-Recall': 0.0208 },
    { 'Accuracy': 0.0312, 'Macro-F1': 0.0202, 'Macro-Precision': 0.3333, 'Macro-Recall': 0.0104 },
    { 'Accuracy': 0.1250, 'Macro-F1': 0.0741, 'Macro-Precision': 0.3333, 'Macro-Recall': 0.0417 },
    { 'Accuracy': 0.6562, 'Macro-F1': 0.2642, 'Macro-Precision': 0.3333, 'Macro-Recall': 0.2188 },
    { 'Accuracy': 0.0938, 'Macro-F1': 0.0571, 'Macro-Precision': 0.3333, 'Macro-Recall': 0.0312 },
    { 'Accuracy': 0.0312, 'Macro-F1': 0.0202, 'Macro-Precision': 0.3333, 'Macro-Recall': 0.0104 },
    { 'Accuracy': 0.1562, 'Macro-F1': 0.0901, 'Macro-Precision': 0.3333, 'Macro-Recall': 0.0521 }
  ],
  'mechanism_reasoning': [
    { 'LLM-Judge Pass Rate': 0.8750 },
    { 'LLM-Judge Pass Rate': 0.9688 },
    { 'LLM-Judge Pass Rate': 0.7500 },
    { 'LLM-Judge Pass Rate': 0.9375 },
    { 'LLM-Judge Pass Rate': 0.8750 },
    { 'LLM-Judge Pass Rate': 0.3125 },
    { 'LLM-Judge Pass Rate': 0.2812 },
    { 'LLM-Judge Pass Rate': 0.1250 },
    { 'LLM-Judge Pass Rate': 0.6250 }
  ],
  'evidence_reasoning': [
    { 'LLM-Judge Pass Rate': 0.9062 },
    { 'LLM-Judge Pass Rate': 0.7500 },
    { 'LLM-Judge Pass Rate': 0.9688 },
    { 'LLM-Judge Pass Rate': 0.9375 },
    { 'LLM-Judge Pass Rate': 0.9062 },
    { 'LLM-Judge Pass Rate': 0.7812 },
    { 'LLM-Judge Pass Rate': 0.7188 },
    { 'LLM-Judge Pass Rate': 0.5625 },
    { 'LLM-Judge Pass Rate': 0.8750 }
  ]
};
