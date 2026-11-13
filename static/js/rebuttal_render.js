// Render only the selected-task supplements; the original leaderboards stay separate.
(function () {
  'use strict';

  function cell(value, digits, percent) {
    if (value === null || value === undefined || !Number.isFinite(value)) return 'N/A';
    return value.toFixed(digits) + (percent ? '%' : '');
  }

  function renderTable(id, headings, rows) {
    var table = document.getElementById(id);
    if (!table) return;
    var header = table.querySelector('thead');
    var body = table.querySelector('tbody');
    header.textContent = '';
    body.textContent = '';
    var headingRow = document.createElement('tr');
    headings.forEach(function (heading) {
      var th = document.createElement('th');
      th.textContent = heading;
      headingRow.appendChild(th);
    });
    header.appendChild(headingRow);
    rows.forEach(function (values) {
      var tr = document.createElement('tr');
      values.forEach(function (value) {
        var td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });
  }

  function renderPoly(metric) {
    var data = REBUTTAL_RESULTS.polyRisk;
    var models = ['GPT-5.6-Luna', 'DeepSeek-V4-Pro', 'Qwen3.6-Plus'];
    var rows = [3, 4, 5, 6, 7, 8, 9, 10].map(function (count) {
      var matching = data.filter(function (row) { return row.drugs === count; });
      var n = matching.length ? matching[0].n : null;
      return [String(count), n === null ? 'N/A' : String(n)].concat(models.map(function (model) {
        var row = matching.find(function (item) { return item.model === model; });
        return row ? cell(row[metric], 2, true) : 'N/A';
      }));
    });
    renderTable('rebuttalPoly', ['Drugs', 'Valid n'].concat(models), rows);
  }

  function render() {
    if (typeof REBUTTAL_RESULTS === 'undefined') return;
    var originalPopulation = LARGE_MODELS.map(function (model, index) {
      return {
        model: model,
        cohort: 'Original',
        child: LARGE_DATA[index][0],
        adult: LARGE_DATA[index][1],
        older: LARGE_DATA[index][2],
        coverage: null
      };
    });
    var originalNames = originalPopulation.map(function (row) { return row.model.toLowerCase(); });
    var addedPopulation = REBUTTAL_RESULTS.population.filter(function (row) {
      return originalNames.indexOf(row.model.toLowerCase()) === -1;
    });
    renderTable('rebuttalPopulation', ['Model', 'Cohort', 'Child', 'Adult', 'Older adult', 'Coverage'],
      originalPopulation.concat(addedPopulation).map(function (row) {
        return [row.model, row.cohort, cell(row.child, 2, true), cell(row.adult, 2, true), cell(row.older, 2, true), cell(row.coverage, 2, true)];
      }));
    renderTable('rebuttalMechanism', ['Model', 'Valid n', 'Accuracy'],
      REBUTTAL_RESULTS.mechanism.map(function (row) {
        return [row.model, String(row.n), cell(row.accuracy, 2, true)];
      }));
    renderTable('rebuttalEvidence', ['Model', 'Selection Set-F1', 'ROUGE-L', 'BLEU', 'BERTScore-F1', 'Judge pass'],
      REBUTTAL_RESULTS.evidence.map(function (row) {
        return [row.model, cell(row.selectionF1, 2, true), cell(row.rougeL, 4, false), cell(row.bleu, 4, false), cell(row.bertF1, 4, false), cell(row.judge, 2, true)];
      }));
    var selector = document.getElementById('polyMetric');
    if (selector) {
      selector.addEventListener('change', function () { renderPoly(selector.value); });
      renderPoly(selector.value);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
}());
