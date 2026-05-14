// SafeDrug Benchmark - Interactive Logic
document.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  // 1. NAVBAR BURGER TOGGLE
  // ============================================================
  var $burger = document.querySelector('.navbar-burger');
  var $menu = document.getElementById('navbarMenu');
  if ($burger && $menu) {
    $burger.addEventListener('click', function () {
      $burger.classList.toggle('is-active');
      $menu.classList.toggle('is-active');
    });
  }

  // ============================================================
  // 2. DATASET OVERVIEW CARDS
  // ============================================================
  (function () {
    var container = document.getElementById('overviewCards');
    if (!container) return;
    var icons = ['fa-pills','fa-shield-virus','fa-flask','fa-skull','fa-microscope','fa-cubes','fa-rotate'];
    DATASET_CATEGORIES.forEach(function (cat, idx) {
      var col = document.createElement('div');
      col.className = 'column is-4-desktop is-6-tablet';
      var subCount = cat.subs.length;
      var taskTypes = [];
      cat.subs.forEach(function (s) { if (taskTypes.indexOf(s.taskType) === -1) taskTypes.push(s.taskType); });
      col.innerHTML = '<div class="card"><header class="card-header"><p class="card-header-title">' +
        '<span class="icon" style="margin-right:0.5rem;color:var(--color-primary)"><i class="fas ' + (icons[idx]||'fa-database') + '"></i></span>' +
        cat.name + '</p></header><div class="card-content"><p class="mb-3">' + cat.description + '</p>' +
        '<div class="is-flex is-justify-content-space-between is-align-items-center">' +
        '<span class="tag is-info is-light"><strong>' + subCount + '</strong> sub-datasets</span>' +
        '<span class="is-size-7 has-text-grey">' + taskTypes.slice(0,2).join(' · ') + '</span></div></div></div>';
      col.querySelector('.card').addEventListener('click', function () {
        document.getElementById('explorer').scrollIntoView({ behavior: 'smooth' });
        var a = document.querySelector('.menu-list a[data-cat="' + cat.id + '"]');
        if (a) a.click();
      });
      container.appendChild(col);
    });
  })();

  // ============================================================
  // 3. DATASET EXPLORER
  // ============================================================
  (function () {
    var tree = document.getElementById('taskTree');
    var detail = document.getElementById('datasetDetail');
    if (!tree || !detail) return;

    function showDatasetDetail(cat, sub) {
      var zipPath = getZipPath(sub.file);
      var exampleHtml = '';
      if (sub.example) {
        exampleHtml = '<h5 class="title is-6 mt-4">Example Record</h5><div class="json-preview">' + syntaxHighlightJSON(sub.example) + '</div>';
      } else {
        exampleHtml = '<p class="has-text-grey-light mt-4">See sibling dataset above for example format.</p>';
      }
      detail.innerHTML = '<h4 class="title is-4">' + sub.name + '</h4>' +
        '<div class="tags mb-3"><span class="tag is-info">' + (sub.format||'jsonl').toUpperCase() + '</span>' +
        '<span class="tag is-warning is-light">' + sub.taskType + '</span></div>' +
        '<p class="mb-4">' + sub.description + '</p>' +
        '<div class="mb-3"><strong>Fields:</strong> <code>' + sub.fields.join(', ') + '</code></div>' +
        '<div class="notification is-warning is-light"><p class="mb-2"><strong>Note:</strong> Dataset is packaged as <code>data.zip</code> on HuggingFace. Download and extract:</p>' +
        '<code style="word-break:break-all">' + zipPath + '</code></div>' +
        '<a class="button btn-download" href="' + getDownloadUrl(sub.file) + '" target="_blank">' +
        '<span class="icon"><i class="fas fa-download"></i></span><span>Go to HuggingFace Dataset</span></a>' +
        '<hr><h5 class="title is-6">Task Category: ' + cat.name + '</h5><p class="mb-2">' + cat.description + '</p>' +
        '<p class="is-size-7 has-text-grey"><strong>' + cat.subs.length + '</strong> sub-datasets in this category</p>' + exampleHtml;
    }

    function syntaxHighlightJSON(obj) {
      var json = JSON.stringify(obj, null, 2);
      return json.replace(/("(?:\\.|[^"\\])*")\s*:/g, '<span class="key">$1</span>:')
        .replace(/: (".*?")/g, ': <span class="string">$1</span>')
        .replace(/: (\d+\.?\d*)/g, ': <span class="number">$1</span>')
        .replace(/: (true|false)/g, ': <span class="boolean">$1</span>')
        .replace(/: (null)/g, ': <span class="null">$1</span>');
    }

    DATASET_CATEGORIES.forEach(function (cat) {
      var catLi = document.createElement('li');
      var catA = document.createElement('a');
      catA.textContent = cat.name; catA.href = '#';
      catA.setAttribute('data-cat', cat.id);
      catA.addEventListener('click', function (e) {
        e.preventDefault();
        var subUl = this.nextElementSibling;
        if (subUl && subUl.tagName === 'UL') subUl.style.display = subUl.style.display === 'none' ? 'block' : 'none';
      });
      catLi.appendChild(catA);
      var subUl = document.createElement('ul');
      cat.subs.forEach(function (sub) {
        var subLi = document.createElement('li');
        var subA = document.createElement('a');
        subA.textContent = sub.name; subA.href = '#';
        subA.setAttribute('data-sub', sub.id);
        subA.addEventListener('click', function (e) {
          e.preventDefault();
          tree.querySelectorAll('a').forEach(function (a) { a.classList.remove('is-active'); });
          this.classList.add('is-active');
          showDatasetDetail(cat, sub);
        });
        subLi.appendChild(subA); subUl.appendChild(subLi);
      });
      catLi.appendChild(subUl); tree.appendChild(catLi);
    });
  })();

  // ============================================================
  // 4. LEADERBOARD TABS
  // ============================================================
  (function () {
    var tabs = document.querySelectorAll('.tabs li');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var targetId = 'tab-' + this.getAttribute('data-tab');
        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        this.classList.add('is-active');
        document.querySelectorAll('.tab-content').forEach(function (tc) { tc.classList.remove('is-visible'); });
        var target = document.getElementById(targetId);
        if (target) target.classList.add('is-visible');
      });
    });
  })();

  // ============================================================
  // 5. LARGE BENCHMARK
  // ============================================================
  var largeSelectedTask = -1;
  var largeRankChartInstance = null;

  initLargeBenchmark();

  function initLargeBenchmark() { buildLargeTaskButtons(); renderLargeRankChart(); renderLargeTable(); }

  function buildLargeTaskButtons() {
    var container = document.getElementById('largeTaskButtons');
    if (!container || container.children.length > 1) return;
    LARGE_TASKS.forEach(function (task, i) {
      var btn = document.createElement('button');
      btn.className = 'button is-small'; btn.setAttribute('data-idx', i); btn.textContent = task.name;
      btn.addEventListener('click', function () {
        container.querySelectorAll('button').forEach(function (b) { b.classList.remove('is-dark','is-selected'); });
        this.classList.add('is-dark','is-selected');
        largeSelectedTask = parseInt(this.getAttribute('data-idx'));
        updateLargeRankChart(); updateLargeTableHighlight();
      });
      container.appendChild(btn);
    });
    container.querySelector('button[data-idx="-1"]').addEventListener('click', function () {
      container.querySelectorAll('button').forEach(function (b) { b.classList.remove('is-dark','is-selected'); });
      this.classList.add('is-dark','is-selected'); largeSelectedTask = -1;
      updateLargeRankChart(); updateLargeTableHighlight();
    });
  }

  function renderLargeRankChart() { updateLargeRankChart(); }

  function updateLargeRankChart() {
    var ctx = document.getElementById('largeRankChart');
    if (!ctx) return;
    if (largeRankChartInstance) largeRankChartInstance.destroy();
    var mcols = ['#0891B2','#0E7490','#155E75','#22D3EE','#06B6D4','#67E8F9','#A5F3FC','#164E63','#083344'];
    var chartData, chartLabel;
    if (largeSelectedTask === -1) {
      chartLabel = 'Average EM% (All 17 Tasks)';
      chartData = LARGE_MODELS.map(function (m, i) {
        var row = LARGE_DATA[i]; return { model: m, val: parseFloat((row.reduce(function(a,b){return a+b;},0)/row.length).toFixed(1)) };
      });
    } else {
      chartLabel = LARGE_TASKS[largeSelectedTask].name + ' — EM%';
      chartData = LARGE_MODELS.map(function (m, i) { return { model: m, val: LARGE_DATA[i][largeSelectedTask] }; });
    }
    chartData.sort(function(a,b){return b.val-a.val;});
    largeRankChartInstance = new Chart(ctx, {
      type: 'bar',
      data: { labels: chartData.map(function(d){return d.model;}),
        datasets: [{ label: chartLabel, data: chartData.map(function(d){return d.val;}),
          backgroundColor: chartData.map(function(_,i){return mcols[i]||'#0891B2';}), borderRadius: 6, borderSkipped: false }] },
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(c){return chartLabel+': '+c.raw+'%';} } } },
        scales: { y: { max: 100, ticks: { callback: function(v){return v+'%';} } } } }
    });
  }

  function renderLargeTable() {
    var thead = document.querySelector('#largeTable thead');
    var tbody = document.querySelector('#largeTable tbody');
    if (!thead || !tbody) return;
    var hdr = '<tr><th>Model</th>';
    LARGE_TASKS.forEach(function(t){hdr+='<th title="'+t.category+'">'+t.name+'</th>';});
    hdr += '<th>Avg</th></tr>'; thead.innerHTML = hdr;
    var allVals = []; LARGE_DATA.forEach(function(r){r.forEach(function(v){allVals.push(v);});});
    var gMin = Math.min.apply(null, allVals), gMax = Math.max.apply(null, allVals);
    var html = '';
    LARGE_DATA.forEach(function(row, mi) {
      var avg = (row.reduce(function(a,b){return a+b;},0)/row.length).toFixed(1);
      html += '<tr data-model="'+mi+'"><td><strong>'+LARGE_MODELS[mi]+'</strong></td>';
      row.forEach(function(val, ci) {
        var t = (val-gMin)/(gMax-gMin+0.001), c = heatColor(t);
        html += '<td data-col="'+ci+'"><span class="cell-bg" style="background:'+c+'"></span><span class="cell-val">'+val.toFixed(1)+'</span></td>';
      });
      html += '<td data-col="avg"><strong>'+avg+'</strong></td></tr>';
    });
    tbody.innerHTML = html;
    var leg = document.createElement('div'); leg.className = 'color-legend';
    leg.innerHTML = '<span>'+gMin.toFixed(1)+'%</span><span class="bar"></span><span>'+gMax.toFixed(1)+'%</span>';
    document.querySelector('#tab-large .box').insertBefore(leg, document.querySelector('#largeTable').parentNode);
    var dirs = {};
    thead.querySelectorAll('th').forEach(function(th, ci) {
      th.addEventListener('click', function() {
        thead.querySelectorAll('th').forEach(function(h){h.classList.remove('sorted-asc','sorted-desc');});
        dirs[ci] = dirs[ci]===1?-1:1; th.classList.add(dirs[ci]===1?'sorted-asc':'sorted-desc');
        Array.from(tbody.querySelectorAll('tr')).sort(function(a,b){
          if(ci===0) return dirs[ci]*a.cells[0].textContent.trim().localeCompare(b.cells[0].textContent.trim());
          return dirs[ci]*((parseFloat(a.cells[ci].querySelector('.cell-val').textContent)||0)-(parseFloat(b.cells[ci].querySelector('.cell-val').textContent)||0));
        }).forEach(function(r){tbody.appendChild(r);});
      });
    });
  }

  function updateLargeTableHighlight() {
    document.querySelectorAll('#largeTable td').forEach(function(td){td.style.background='';td.style.fontWeight='';});
    if (largeSelectedTask!==-1) document.querySelectorAll('#largeTable td[data-col="'+largeSelectedTask+'"]').forEach(function(td){td.style.background='rgba(8,145,178,0.1)';td.style.fontWeight='700';});
  }

  function heatColor(t) {
    var r,g,b;
    if(t<0.5){var s=t*2;r=Math.round(34+s*216);g=Math.round(197+s*7);b=Math.round(94-s*94);}
    else{var s=(t-0.5)*2;r=250;g=Math.round(204-s*152);b=Math.round(s*56);}
    return 'rgb('+r+','+g+','+b+')';
  }

  // ============================================================
  // 6. SMALL BENCHMARK
  // ============================================================
  var smallSelectedTask = -1;
  var smallBarChartInstance = null;
  var radarChartInstance = null;
  var smallTableMetric = '';
  var radarZoomLevel = 0;

  var modelColors = ['#0891B2','#E74C3C','#2ECC71','#F39C12','#8E44AD','#3498DB','#E67E22','#1ABC9C','#E91E63'];

  var RADAR_TASKS = SMALL_TASKS.filter(function(t){return t.metrics.length>=2;});
  var SKIP_RADAR_TASKS = SMALL_TASKS.filter(function(t){return t.metrics.length<2;});

  function bestMetric(task) {
    if (task.format==='generation') return 'LLM-Judge Pass Rate';
    if (task.format==='classification'||task.format==='single_span_selection') return 'Accuracy';
    return 'Set-F1';
  }
  function hasMetric(task, m) { return task.metrics.indexOf(m)!==-1; }

  initSmallBenchmark();

  function initSmallBenchmark() {
    buildSmallTaskButtons();
    buildTableMetricSelector();
    setupRadarZoom();
    setupRadar();
    updateAllViews();
  }

  function buildSmallTaskButtons() {
    var container = document.getElementById('smallTaskButtons');
    if (!container || container.children.length > 1) return;
    SMALL_TASKS.forEach(function(task, i) {
      var btn = document.createElement('button');
      btn.className = 'button is-small'; btn.setAttribute('data-idx', i); btn.textContent = task.name;
      btn.addEventListener('click', function () {
        container.querySelectorAll('button').forEach(function(b){b.classList.remove('is-dark','is-selected');});
        this.classList.add('is-dark','is-selected');
        smallSelectedTask = parseInt(this.getAttribute('data-idx'));
        updateAllViews();
      });
      container.appendChild(btn);
    });
    container.querySelector('button[data-idx="-1"]').addEventListener('click', function () {
      container.querySelectorAll('button').forEach(function(b){b.classList.remove('is-dark','is-selected');});
      this.classList.add('is-dark','is-selected'); smallSelectedTask = -1;
      updateAllViews();
    });
  }

  function updateAllViews() { updateMetricNote(); updateBarChart(); updateRadar(); renderSmallTable(); }

  function buildTableMetricSelector() {
    var sel = document.getElementById('smallTableMetric');
    if (!sel || sel.options.length > 1) return;
    var allMetrics = [];
    SMALL_TASKS.forEach(function(t){t.metrics.forEach(function(m){if(allMetrics.indexOf(m)===-1)allMetrics.push(m);});});
    allMetrics.forEach(function(m){var o=document.createElement('option');o.value=m;o.textContent=m;sel.appendChild(o);});
    sel.addEventListener('change', function(){smallTableMetric=this.value;renderSmallTable();});
  }

  function setupRadarZoom() {
    document.querySelectorAll('#radarZoom button').forEach(function(btn){
      btn.addEventListener('click',function(){
        var a=this.getAttribute('data-zoom');
        if(a==='in') radarZoomLevel=Math.min(radarZoomLevel+1,7);
        else if(a==='out') radarZoomLevel=Math.max(radarZoomLevel-1,0);
        else radarZoomLevel=0;
        updateRadar();
      });
    });
  }

  function getRadarMax() { var levels=[100,80,60,45,30,20,15,10]; var idx=Math.max(0,Math.min(levels.length-1,radarZoomLevel)); return levels[idx]; }

  function updateMetricNote() {
    var el = document.getElementById('smallMetricNoteText');
    if (!el) return;
    if (smallSelectedTask===-1) {
      var lines = RADAR_TASKS.map(function(t){return t.name+' → <strong>'+bestMetric(t)+'</strong>';}).join(' · ');
      var skipped = SKIP_RADAR_TASKS.map(function(t){return t.name+' ('+t.metrics[0]+' only)';}).join(', ');
      el.innerHTML = '<strong>Bar Chart:</strong> hidden for overview (use task buttons to compare).<br>' +
        '<strong>Radar:</strong> '+RADAR_TASKS.length+' tasks with ≥2 metrics shown. Excluded (single metric): '+skipped+'.<br>' +
        '<strong>Auto metrics:</strong> ' + lines;
    } else {
      var task = SMALL_TASKS[smallSelectedTask];
      el.innerHTML = '<strong>'+task.name+'</strong> ('+task.format.replace(/_/g,' ')+') · Metrics: '+task.metrics.join(', ');
      if (task.metrics.length<2) el.innerHTML += ' <em>(single metric — radar not shown)</em>';
      else el.innerHTML += ' <em>(use +/- to zoom radar)</em>';
    }
  }

  function updateBarChart() {
    var wrapper = document.getElementById('smallBarChartWrapper');
    var ctx = document.getElementById('smallBarChart');
    if (!ctx || !wrapper) return;
    if (smallSelectedTask===-1) {
      wrapper.style.display='none';
      if(smallBarChartInstance){smallBarChartInstance.destroy();smallBarChartInstance=null;}
      return;
    }
    wrapper.style.display='block';
    if(smallBarChartInstance) smallBarChartInstance.destroy();

    var task = SMALL_TASKS[smallSelectedTask];
    var vals = SMALL_DATA[task.id];
    var metrics = task.metrics;

    var xLabels = [];
    SMALL_MODELS.forEach(function(m,mi){
      if(mi>0&&SMALL_MODEL_GROUPS[mi]==='open-source'&&SMALL_MODEL_GROUPS[mi-1]==='proprietary') xLabels.push('── Open ──');
      xLabels.push(m);
    });

    var datasets = metrics.map(function(metric,mi){
      return {
        label: metric,
        data: SMALL_MODELS.map(function(_,mIdx){return vals&&vals[mIdx]&&vals[mIdx][metric]!==undefined?(vals[mIdx][metric]||0)*100:0;}),
        backgroundColor: modelColors[mi]||'#0891B2', borderRadius: 4, borderSkipped: false
      };
    });

    smallBarChartInstance = new Chart(ctx, {
      type: 'bar',
      data: { labels: xLabels, datasets: datasets },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              generateLabels: function(chart){
                var labels=[],addedSep=false;
                chart.data.datasets.forEach(function(ds,i){
                  if(i===0) labels.push({text:'Proprietary',fillStyle:'transparent',strokeStyle:'transparent',lineWidth:0,hidden:false,fontColor:'#64748B',fontStyle:'bold'});
                  labels.push({text:ds.label,fillStyle:ds.backgroundColor,strokeStyle:ds.backgroundColor,hidden:!chart.isDatasetVisible(i),index:i,pointStyle:'circle'});
                });
                return labels;
              }
            }
          },
          tooltip: { callbacks: { label: function(c){return c.dataset.label+': '+c.raw.toFixed(1)+'%';} } }
        },
        scales: { y: { title: { display: true, text: task.name }, max: 100, ticks: { callback: function(v){return v+'%';} } } }
      }
    });
  }

  function renderSmallTable() {
    var thead = document.querySelector('#smallTable thead');
    var tbody = document.querySelector('#smallTable tbody');
    var metricWrapper = document.getElementById('smallTableMetricWrapper');
    if (!thead || !tbody) return;

    var modelHeaders = '';
    SMALL_MODELS.forEach(function(m,mi){
      if(mi>0&&SMALL_MODEL_GROUPS[mi]==='open-source'&&SMALL_MODEL_GROUPS[mi-1]==='proprietary') modelHeaders+='<th class="group-sep">OS</th>';
      modelHeaders+='<th>'+m+'</th>';
    });

    if (smallSelectedTask===-1) {
      if(metricWrapper) metricWrapper.style.display='block';
      var metric=smallTableMetric||'';
      thead.innerHTML='<tr><th>Task</th><th>Format</th>'+modelHeaders+'</tr>';
      var html='';
      SMALL_TASKS.forEach(function(task){
        var bm=metric||bestMetric(task),vals=SMALL_DATA[task.id],maxV=0;
        if(vals) vals.forEach(function(v){if(v[bm]!==undefined)maxV=Math.max(maxV,(v[bm]||0)*100);});
        html+='<tr><td><strong>'+task.name+'</strong></td><td><span class="format-badge '+task.format+'">'+task.format.replace(/_/g,' ')+'</span></td>';
        SMALL_MODELS.forEach(function(_,mi){
          if(mi>0&&SMALL_MODEL_GROUPS[mi]==='open-source'&&SMALL_MODEL_GROUPS[mi-1]==='proprietary') html+='<td class="group-sep"></td>';
          if(!vals||!vals[mi]||vals[mi][bm]===undefined||vals[mi][bm]===null){html+='<td class="has-text-grey">-</td>';}
          else{var s=(vals[mi][bm]||0)*100;html+='<td'+(s>=maxV&&maxV>0?' style="font-weight:700;color:var(--color-cta-dark)"':'')+'>'+s.toFixed(1)+'%</td>';}
        });
        html+='</tr>';
      });
      tbody.innerHTML=html;
    } else {
      if(metricWrapper) metricWrapper.style.display='none';
      var task=SMALL_TASKS[smallSelectedTask],vals=SMALL_DATA[task.id],metrics=task.metrics;
      thead.innerHTML='<tr><th>Model</th>'+metrics.map(function(m){return'<th>'+m+'</th>';}).join('')+'</tr>';
      var html='';
      SMALL_MODELS.forEach(function(model,mi){
        html+='<tr><td><strong>'+model+'</strong></td>';
        metrics.forEach(function(metric){
          if(!vals||!vals[mi]||vals[mi][metric]===undefined||vals[mi][metric]===null){html+='<td class="has-text-grey">-</td>';}
          else{var s=(vals[mi][metric]||0)*100,maxM=0;
            SMALL_MODELS.forEach(function(_,idx){if(vals&&vals[idx]&&vals[idx][metric]!==undefined)maxM=Math.max(maxM,(vals[idx][metric]||0)*100);});
            html+='<td'+(s>=maxM&&maxM>0?' style="font-weight:700;color:var(--color-cta-dark)"':'')+'>'+s.toFixed(1)+'%</td>';}
        });
        html+='</tr>';
      });
      tbody.innerHTML=html;
    }
  }

  function setupRadar() {
    var container = document.getElementById('radarModelSelector');
    if (!container) return;
    container.innerHTML='';
    var propTitle=document.createElement('div');propTitle.className='model-separator';propTitle.textContent='Proprietary';container.appendChild(propTitle);
    SMALL_MODELS.forEach(function(model,mi){
      if(mi>0&&SMALL_MODEL_GROUPS[mi]==='open-source'&&SMALL_MODEL_GROUPS[mi-1]==='proprietary'){var sep=document.createElement('div');sep.className='model-separator';sep.textContent='Open-Source';container.appendChild(sep);}
      var label=document.createElement('label');
      label.innerHTML='<input type="checkbox" value="'+mi+'" '+(SMALL_MODEL_GROUPS[mi]==='proprietary'?'checked':'')+'> '+model;
      container.appendChild(label);
    });
    container.querySelectorAll('input').forEach(function(cb){cb.addEventListener('change',updateRadar);});
    updateRadar();
  }

  function updateRadar() {
    var ctx = document.getElementById('radarChart');
    if (!ctx) return;
    if (radarChartInstance) radarChartInstance.destroy();

    var selected=[];
    document.querySelectorAll('#radarModelSelector input:checked').forEach(function(cb){selected.push(parseInt(cb.value));});
    if(selected.length===0) selected=[0];
    var rMax=getRadarMax();

    if(smallSelectedTask===-1){
      var tasks=RADAR_TASKS;
      if(tasks.length<2){radarChartInstance=null;return;}
      var datasets=selected.map(function(mi){
        return {
          label:SMALL_MODELS[mi],
          data:tasks.map(function(t){var bm=bestMetric(t),v=SMALL_DATA[t.id];return v&&v[mi]&&v[mi][bm]!==undefined?(v[mi][bm]||0)*100:0;}),
          borderColor:modelColors[mi]||'#0891B2',backgroundColor:modelColors[mi]+'20',borderWidth:2,pointBackgroundColor:modelColors[mi],pointRadius:4
        };
      });
      radarChartInstance=new Chart(ctx,{
        type:'radar',
        data:{labels:tasks.map(function(t){return t.name;}),datasets:datasets},
        options:{
          responsive:true,maintainAspectRatio:false,
          scales:{r:{min:0,max:rMax,ticks:{stepSize:rMax/5,callback:function(v){return v+'%';}},pointLabels:{font:{size:10}}}},
          plugins:{
            legend:{
              position:'bottom',
              labels:{
                generateLabels:function(chart){
                  var labels=[],addedSep=false;
                  chart.data.datasets.forEach(function(ds,i){
                    if(i===0) labels.push({text:'Proprietary',fillStyle:'transparent',strokeStyle:'transparent',lineWidth:0,hidden:false,fontColor:'#64748B',fontStyle:'bold'});
                    if(!addedSep&&SMALL_MODEL_GROUPS[i]==='open-source'){labels.push({text:'Open-Source',fillStyle:'transparent',strokeStyle:'transparent',lineWidth:0,hidden:false,fontColor:'#64748B',fontStyle:'bold'});addedSep=true;}
                    labels.push({text:ds.label,fillStyle:ds.borderColor,strokeStyle:ds.borderColor,hidden:!chart.isDatasetVisible(i),index:i,pointStyle:'circle'});
                  });
                  return labels;
                }
              }
            },
            tooltip:{callbacks:{label:function(c){var t=tasks[c.dataIndex];return c.dataset.label+' / '+t.name+': '+c.raw.toFixed(1)+'%';}}}
          }
        }
      });
    } else {
      var task=SMALL_TASKS[smallSelectedTask];
      if(task.metrics.length<2){radarChartInstance=null;return;}
      var metrics=task.metrics;
      var datasets=selected.map(function(mi){
        return {
          label:SMALL_MODELS[mi],
          data:metrics.map(function(metric){var v=SMALL_DATA[task.id];return v&&v[mi]&&v[mi][metric]!==undefined?(v[mi][metric]||0)*100:0;}),
          borderColor:modelColors[mi]||'#0891B2',backgroundColor:modelColors[mi]+'20',borderWidth:2,pointBackgroundColor:modelColors[mi],pointRadius:4
        };
      });
      radarChartInstance=new Chart(ctx,{
        type:'radar',
        data:{labels:metrics,datasets:datasets},
        options:{
          responsive:true,maintainAspectRatio:false,
          scales:{r:{min:0,max:rMax,ticks:{stepSize:rMax/5,callback:function(v){return v+'%';}},pointLabels:{font:{size:11}}}},
          plugins:{
            legend:{
              position:'bottom',
              labels:{
                generateLabels:function(chart){
                  var labels=[],addedSep=false;
                  chart.data.datasets.forEach(function(ds,i){
                    if(i===0) labels.push({text:'Proprietary',fillStyle:'transparent',strokeStyle:'transparent',lineWidth:0,hidden:false,fontColor:'#64748B',fontStyle:'bold'});
                    if(!addedSep&&SMALL_MODEL_GROUPS[i]==='open-source'){labels.push({text:'Open-Source',fillStyle:'transparent',strokeStyle:'transparent',lineWidth:0,hidden:false,fontColor:'#64748B',fontStyle:'bold'});addedSep=true;}
                    labels.push({text:ds.label,fillStyle:ds.borderColor,strokeStyle:ds.borderColor,hidden:!chart.isDatasetVisible(i),index:i,pointStyle:'circle'});
                  });
                  return labels;
                }
              }
            },
            tooltip:{callbacks:{label:function(c){return c.dataset.label+': '+c.raw.toFixed(1)+'%';}}}
          }
        }
      });
    }
  }

  // ============================================================
  // 7. SMOOTH SCROLL
  // ============================================================
  document.querySelectorAll('.navbar-item[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var href = this.getAttribute('href');
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        var target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
      if ($burger && $burger.classList.contains('is-active')) $burger.click();
    });
  });

});
