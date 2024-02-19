/* Cargamos los módulos que vamos a usar, una vez cargados ejecutará la función 'drawCharts' */
google.charts.load('current', { 'packages': ['sankey', 'corechart', 'bar', 'calendar'] });
google.charts.setOnLoadCallback(drawCharts);
import { datos } from './data.js';
/* función que carga cada uno de los gráficos */

function drawCharts() {
	drawChartP1();
	drawChartP2();
	drawChartP3();
	drawChartP4();
	drawChartP5();
}
function arreglarDatosP2(data) {
	var arreglo = [];
	for (let i = 0; i < data.length; i++) {
		const element = data[i];
		var color = `${element[2] < 250 ? `green` : element[2] < 500 ? `yellow` : element[2] < 750 ? `orange` : element[2] < 1000 ? `red` : element[2] < 1250 ? `maroon` : element[2] < 1500 ? `crimson` : element[2] < 1750 ? `black` : element[2] < 2000 && `dimgray`}`;
		arreglo.push([element[0], element[2], "Año - " + element[1], color]);
	}
	return arreglo.sort((a, b) => {
		if(a[1] > b[1]&&a[0]==b[0]) return 1;
		else if(a[1] < b[1]&&a[0]==b[0]) return -1;
		else return 0;
	});
}
function arreglarDatosP3(data){
	var arreglo = [];
	for (let i = 0; i < data.length; i++) {
		const element = data[i];
		if(element[0]=="Jalisco") arreglo.push([element[0],element[2],element[3],element[1]])
		
	}
	return arreglo;
}
function arreglarDatosP4(data){
	var arreglo = [];
	for (let i = 0; i < data.length; i++) {
		const element = data[i];
		if(element[0]=="Chiapas") arreglo.push([element[1],element[2]])
		
	}
	return arreglo;
}
function drawChartP5() {
	var dataTable = google.visualization.arrayToDataTable([
		['Year', 'Sales', 'Expenses'],
		['2013', 1000, 400],
		['2014', 1170, 460],
		['2015', 660, 1120],
		['2016', 1030, 540]
	]);

	var options = {
		title: 'Company Performance',
		hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
		vAxis: { minValue: 0 }
	};
	var chart = new google.visualization.AreaChart(document.getElementById('p5Chart'));
	chart.draw(dataTable, options);
}
function drawChartP4() {
	var data = google.visualization.arrayToDataTable([
		['Año', 'Personas'],
		...arreglarDatosP4(datos)
	]);
	var chart = new google.visualization.PieChart(document.getElementById('p4Chart'));
	chart.draw(data, { width: 500, height: 400,title:'Chiapas',subtitle:"aaa", backgroundColor: 'transparent', legend: 'bottom' });
}
function drawChartP3() {
	var data = google.visualization.arrayToDataTable([
		['Entidad federativa', 'Personas','Porcentaje','Año'],
		...arreglarDatosP3(datos)
	]);
	var chart = new google.visualization.BubbleChart(document.getElementById('p3Chart'));
	chart.draw(data, { width: 500, height: 500, title: 'Pobreza en el estado de Jalisco', hAxis: { title: 'Year', titleTextStyle: { color: 'red' } } });

}
function drawChartP2() {
	var data = google.visualization.arrayToDataTable([
		[{label:'Estados',role:'domain'}, 'Personas en situacion de pobreza', { role: 'interval', label: 'Miles de personas' }, { role: 'style' }],
		...arreglarDatosP2(datos) //estado año poblacion
	]);
	var chart = new google.visualization.ColumnChart(document.getElementById('p2Chart'));
	var options = { width: 950, height: 400, bar: { groupWidth: "95%" }, legend: { position: "none" }, title: 'Población en miles', hAxis: { title: 'Entidades federativas', titleTextStyle: { color: 'red' } } };
	chart.draw(data,options);
}

function drawChartP1() {
	/* Cargamos los datos */
	var data = google.visualization.arrayToDataTable([
		['From', 'To', 'Miles de personas'],
		...datos.map(e=>[e[0],e[1],e[2]])
	]);
	var rowsQty = data.getNumberOfRows();
	var autoHeight = rowsQty * 20;
	/* Creamos la visualización, en este caso se visualizará en el div con id 'p1Chart' */
	var chart = new google.visualization.Sankey(document.getElementById('p1Chart'));
	var options = {
		width: 975, height: 500, sankey: {
			iterations: 0,
			node: { labelPadding: 5, width: 100 },
		}
	};
	/* Finalmente pintamos la visualización, el segundo parámetro son las opciones */
	chart.draw(data, options);
}
