// ALUNO: DAVID LI ZHAO
// MATRÍCULA: 18202656
// DISCIPLINA: VISUALIZAÇÃO DE DADOS
// PROJETO PRÁTICO
// DADOS RETIRADOS DO "EU TE-SAT 2020" acessado em: https://www.europol.europa.eu/activities-services/main-reports/european-union-terrorism-situation-and-trend-report-te-sat-2020

// DEFINE OS TAMANHOS DE MARGENS
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

// DEFINE O CANVAS
const svg = d3.select("#chart-area").append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT) // Atribui os valores máximos de largura do canvas
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM) // Atribui os valores máximos de altura do canvas

// DEFINE GRUPO PARA OS ELEMENTOS SVG
  const group = svg.append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`) // Reposiciona o SVG

// DEFINE AS ESPECIFICAÇÕES DO TÍTULO DO EIXO X
group.append("text")
  .attr("class", "x axis-label")
  .attr("x", WIDTH / 2) // Centraliza o título no eixo x  
  .attr("y", HEIGHT + 100) // Distancia para a esquerda o título do eixo x
  //Formatação do texto
  .attr("font-size", "15px")
  .attr("text-anchor", "middle")
  .text("Terrorist Affiliation") 

// DEFINE AS ESPECIFICAÇÕES DO TÍTULO DO EIXO Y
group.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (HEIGHT / 2)) // Centraliza o título no eixo y
  .attr("y", -80) // Distancia para baixo o título do eixo y
  // Formatação do texto
  .attr("font-size", "15px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)") // Rotaciona o título eixo y em -90 graus, ficando em paralelo com o próprio eixo
  .text("Incidence of Attacks (EU)")  

// DEFINE A LEITURA DE DADOS DO ARQUIVO DATA.JSON
d3.json("data/data.json").then(data => {
  data.forEach(d => {
    d.num = Number(d.num) // Converte os dados dados da variável NUM em valores numéricos
  })

  // DEFINE A ESCALA PARA O EIXO X (ESCALA DE BANDA)
  const x = d3.scaleBand()
    .domain(data.map(d => d.name)) // Mapeia a variável NAME
    .range([0, WIDTH]) // Define a largura do eixo
    .paddingInner(0.2) // Define o espaçamento entre as barras 
    .paddingOuter(0.2) // Define o espaçamento entre as barras e os eixos

  // DEFINE A ESCALA PARA O EIXO Y (ESCALA LINEAR)
  const y = d3.scaleLinear()
    .domain([0, 60]) // Define os valores mínimos e máximos para o eixo y
    .range([HEIGHT, 0])

  // DEFINE AS ESPECIFICAÇÕES DO EIXO X
  const xAxisCall = d3.axisBottom(x) // Parâmetro do D3
  group.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${HEIGHT})`) // Reposiciona o eixo x para a parte de baixo
    .call(xAxisCall)
    // Formatação do texto
    .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-50)") // Rotaciona os dados do eixo x em -50 graus 

  // DEFINE AS ESPECIFICAÇÕES DO EIXO Y
  const yAxisCall = d3.axisLeft(y) // Parâmetro do D3
    .ticks(10) // Realiza o cálculo de números de tracejados
    .tickFormat(d => d)
  group.append("g")
    .attr("class", "y axis")
    .call(yAxisCall)

  // CRIA OS RETÂNGULOS E LÊ OS DADOS
  const rects = group.selectAll("rect")
    .data(data)

  // FORMATAÇÃO DOS RETÂNGULOS
  rects.enter().append("rect")
    .attr("y", d => y(d.num)) // Identifica os valores a serem inseridos no eixo y
    .attr("x", (d) => x(d.name)) // Identifica os valores a serem inseridos no eixo x
    .attr("width", x.bandwidth) // Retorna a largura do eixo x para adequar os valores inseridos ao seu tamanho
    .attr("height", d => HEIGHT - y(d.num)) // Retorna a altura do eixo y para adequar os valores inseridos ao seu tamanho 
    .attr("fill", "red")
   
})
