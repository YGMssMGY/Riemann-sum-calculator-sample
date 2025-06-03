function f(x) {
    return Math.pow((0.25 * x - 2), 2);
}

function g(x) {
    return -Math.pow((0.25 * x - 2), 2) + 4;
}

const INTERSECTION_1 = 2.34315;
const INTERSECTION_2 = 13.65685;

const ACTUAL_TAIL_VOLUME = 4.501;
const ACTUAL_BODY_VOLUME = 37.913;
const ACTUAL_TOTAL_VOLUME = 42.414;

const sectionSelect = document.getElementById('section-select');
const rectanglesSlider = document.getElementById('rectangles');
const rectValueSpan = document.getElementById('rect-value');
const methodSelect = document.getElementById('method');
const calculateBtn = document.getElementById('calculate-btn');
const riemannResult = document.getElementById('riemann-result');
const actualResult = document.getElementById('actual-result');
const errorResult = document.getElementById('error-result');
const errorPercent = document.getElementById('error-percent');
rectanglesSlider.addEventListener('input', (e) => {
    rectValueSpan.textContent = e.target.value;
});

calculateBtn.addEventListener('click', calculate);
plotFunctions();

function calculate() {
    const section = sectionSelect.value;
    const n = parseInt(rectanglesSlider.value);
    const method = methodSelect.value;
    
    let riemannSum = 0;
    let actualVolume = 0;
    let startX = 0;
    let endX = INTERSECTION_2;
    if (section === 'tail') {
        endX = INTERSECTION_1;
        actualVolume = ACTUAL_TAIL_VOLUME;
    } else if (section === 'body') {
        startX = INTERSECTION_1;
        actualVolume = ACTUAL_BODY_VOLUME;
    } else { // both
        actualVolume = ACTUAL_TOTAL_VOLUME;
    }
    
    riemannSum = calculateRiemannSum(startX, endX, n, method);
    
    riemannResult.textContent = riemannSum.toFixed(3);
    actualResult.textContent = actualVolume.toFixed(3);
    const error = Math.abs(actualVolume - riemannSum);
    errorResult.textContent = error.toFixed(3);
    errorPercent.textContent = ((error / actualVolume) * 100).toFixed(2) + '%';
    
    plotRiemannSum(section, n, method);
}

function calculateRiemannSum(a, b, n, method) {
    const dx = (b - a) / n;
    let sum = 0;
    
    for (let i = 0; i < n; i++) {
        let x;
        if (method === 'left') {
            x = a + i * dx;
        } else if (method === 'right') {
            x = a + (i + 1) * dx;
        } else { 
            x = a + (i + 0.5) * dx;
        }
        
        let diff;
        if (x <= INTERSECTION_1) {
            // In tail section: f(x) > g(x)
            diff = f(x) - g(x);
        } else {
            // In body section: g(x) > f(x)
            diff = g(x) - f(x);
        }
        
        const area = (Math.PI / 8) * Math.pow(diff, 2);
        sum += area * dx;
    }
    
    return sum;
}

function plotFunctions() {
    const x = [];
    const y_f = [];
    const y_g = [];

    for (let i = 0; i <= 14; i += 0.1) {
        x.push(i);
        y_f.push(f(i));
        y_g.push(g(i));
    }
    
    const trace1 = {
        x: x,
        y: y_f,
        type: 'scatter',
        mode: 'lines',
        name: 'f(x) = (¼x - 2)²',
        line: { color: '#667eea', width: 3 }
    };
    
    const trace2 = {
        x: x,
        y: y_g,
        type: 'scatter',
        mode: 'lines',
        name: 'g(x) = -(¼x - 2)² + 4',
        line: { color: '#764ba2', width: 3 }
    };
    
    const intersections = {
        x: [INTERSECTION_1, INTERSECTION_2],
        y: [2, 2],
        type: 'scatter',
        mode: 'markers',
        name: 'Intersections',
        marker: { color: 'red', size: 10 }
    };
    
    const layout = {
        title: 'Fish Model Functions',
        xaxis: { title: 'x', range: [-0.5, 14.5] },
        yaxis: { title: 'y', range: [-1, 5] },
        showlegend: true,
        plot_bgcolor: '#f8f9fa',
        paper_bgcolor: 'white'
    };
    
    Plotly.newPlot('function-plot', [trace1, trace2, intersections], layout);
}

function plotRiemannSum(section, n, method) {
    const traces = [];
    
    const x = [];
    const y_f = [];
    const y_g = [];
    
    for (let i = 0; i <= 14; i += 0.1) {
        x.push(i);
        y_f.push(f(i));
        y_g.push(g(i));
    }
    
    traces.push({
        x: x,
        y: y_f,
        type: 'scatter',
        mode: 'lines',
        name: 'f(x)',
        line: { color: '#667eea', width: 2 }
    });
    
    traces.push({
        x: x,
        y: y_g,
        type: 'scatter',
        mode: 'lines',
        name: 'g(x)',
        line: { color: '#764ba2', width: 2 }
    });
    let startX = 0;
    let endX = INTERSECTION_2;
    
    if (section === 'tail') {
        endX = INTERSECTION_1;
    } else if (section === 'body') {
        startX = INTERSECTION_1;
    }
    addRiemannRectangles(traces, startX, endX, n, method);
    
    const layout = {
        title: `Riemann Sum Visualization (${method} method, n=${n})`,
        xaxis: { title: 'x', range: [-0.5, 14.5] },
        yaxis: { title: 'y', range: [-1, 5] },
        showlegend: false,
        plot_bgcolor: '#f8f9fa',
        paper_bgcolor: 'white'
    };
    
    Plotly.newPlot('riemann-plot', traces, layout);
}

function addRiemannRectangles(traces, a, b, n, method) {
    const dx = (b - a) / n;
    
    for (let i = 0; i < n; i++) {
        const x_left = a + i * dx;
        const x_right = a + (i + 1) * dx;
        
        let x_sample;
        if (method === 'left') {
            x_sample = x_left;
        } else if (method === 'right') {
            x_sample = x_right;
        } else { 
            x_sample = (x_left + x_right) / 2;
        }
        
        const f_val = f(x_sample);
        const g_val = g(x_sample);
        const isInTail = x_sample <= INTERSECTION_1;
        const fillColor = isInTail ? 'rgba(102, 126, 234, 0.3)' : 'rgba(118, 75, 162, 0.3)';
        const lineColor = isInTail ? '#667eea' : '#764ba2';
        
        traces.push({
            x: [x_left, x_left, x_right, x_right, x_left],
            y: [Math.min(f_val, g_val), Math.max(f_val, g_val), Math.max(f_val, g_val), Math.min(f_val, g_val), Math.min(f_val, g_val)],
            fill: 'toself',
            fillcolor: fillColor,
            line: {
                color: lineColor,
                width: 1
            },
            type: 'scatter',
            mode: 'lines',
            showlegend: false
        });
    }
}

window.addEventListener('load', () => {
    calculate();
}); 
