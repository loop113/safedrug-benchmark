# SafeDrug Benchmark Page Design

## Overview
Transform the Nerfies academic template into a drug safety benchmark project page.
Single page, no build tools, CDN-only dependencies.

## Constraints
- Double-blind review: NO author info, NO citation/BibTeX section
- All data exists locally; eval results to be hardcoded as JS

## Sections

### 1. Hero
- Paper title (user provided)
- Abstract placeholder (empty for now)
- Links: HuggingFace Dataset (https://huggingface.co/datasets/JM00113/SafeDrug), GitHub Code

### 2. Dataset Overview
- 7 task category cards with brief descriptions and sample counts

### 3. Dataset Explorer
- Left panel: task tree selector (7 categories → sub-tasks)
- Right panel: description, formatted JSON example, download link per sub-task
- Data examples hardcoded in JS (2-3 samples per JSONL/JSON file)

### 4. Leaderboard
- Tab 1 - Large Benchmark: heatmap table (9 models × 17 tasks, EM%), bar chart for overall ranking
- Tab 2 - Small Benchmark: grouped bar chart by task format, radar chart for model comparison, data table
- Charts via Chart.js CDN

## Data Sources
- Datasets: `SafeDrug_LF/data/Large/` (7 tasks, 17 JSONL + 6 JSON files)
- Small split: `SafeDrug_LF/data/Small/splits_clean/` (3 JSONL files)
- Large eval: `metrics_final/metrics.xlsx` (9 models, EM metric)
- Small eval: `eval_agent_results/benchmark_summary_all_models.csv` (5 models, 11 tasks, multi-metric)

## Technical
- Bulma CSS + jQuery + Font Awesome (existing)
- Chart.js CDN for charts
- `static/js/data.js` - all hardcoded dataset examples
- `static/js/leaderboard.js` - all hardcoded eval results
- `static/js/index.js` - interactive logic (explorer switching, leaderboard tabs, sorting)
- `static/css/index.css` - additional styles
