# SafeDrug benchmark website

Static project page for SafeDrug, a benchmark of large language models on adverse drug events, drug–drug interactions, pharmacological mechanisms, evidence grounding, drug replacement, and population-specific safety.

## Run locally

Open `index.html` in a browser, or serve this directory with `python -m http.server 8000` and visit `http://localhost:8000`. No build step or API key is required. Run the data checks with `node --test tests/rebuttal.test.js`.

## Results and provenance

- `static/js/leaderboard_data.js`: original Large and Small leaderboard values. The original Small leaderboard has a per-task metric selector. In Large, age-specific ADE uses Set-F1; other tasks use Exact Match. Its 17-task average combines these metrics and is descriptive rather than a single-metric score.
- `static/js/rebuttal_data.js`: rebuttal-stage supplement values. The seven-model age comparison comes from `results/frontier_api/frontier_population_7model.csv` in the parent rebuttal project. Polypharmacy risk values for 3–10 drugs come from `results/frontier_api/frontier_poly_balanced_metrics.csv`; mechanism, evidence and medical-model figures are traceable to `results/rebuttal_experiment_summary.md` and task metrics in the parent project.
- `static/js/rebuttal_render.js`: renders the supplemental comparison tables without changing original leaderboard rankings. Supplementary models were tested on selected tasks only, so they are excluded from the original overall average.
- Expanded 3–10-drug dataset counts come from `outputs/019f937d-0aef-7352-9cb6-26bdd272a795/data_source_audit_report_zh.md` in the parent rebuttal project. Dataset counts and evaluated test counts are separate quantities.

For polypharmacy, 3–5-drug results use 2,000 sampled test cases per group, whereas 6–10-drug results use all available test cases. The label distribution becomes strongly imbalanced as drug count rises; compare accuracy with balanced accuracy, macro-F1 and sample size. BERTScore-F1 uses `roberta-large` and does not by itself validate clinical correctness. LLM-judge pass rates are not clinician-agreement measurements.

The [SafeDrug dataset](https://huggingface.co/datasets/JM00113/SafeDrug) is hosted separately. Its current dataset-card license is CC BY-NC 4.0; source datasets can have additional terms. This site is for research evaluation, not clinical decision-making.

The Dataset Explorer indexes all 42 JSON/JSONL files in the release, including 3–10-drug DDI and risk files, the Qwen-prepared Small split, source records, and documentation. Individual download buttons use Hugging Face `resolve/main/data/` links. The complete `data.zip` includes the same data directory plus Markdown documentation. Published sizes and SHA-256 checksums are available in the dataset repository's `release_manifest.json`.

The paper button serves `static/SafeDrug_Paper.pdf`, replaced locally with the 12 November 2026 accepted-paper file supplied by the author.

## Publishing

This repository can be deployed as a GitHub Pages static site. After reviewing local changes, commit and push to the intended branch and verify the published page. Updating this local copy alone does not update GitHub.

## Website attribution

The site design adapts the [Nerfies project-page template](https://github.com/nerfies/nerfies.github.io), which is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). This attribution applies to the inherited website template; it does not change the SafeDrug dataset license.
