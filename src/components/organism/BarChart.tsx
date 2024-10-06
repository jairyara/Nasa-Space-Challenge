import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface BarChartProps {
    data: {
        year: string;
        total: string;
        total_solid_fuel: string;
        total_liquid_fuel: string;
        total_gas_fuel: string;
        total_cement: string;
        total_gas_flaring: string;
        total_per_capita: string;
    }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        // Convertir los valores de CO2 de string a number
        const formattedData = data.map(d => ({
            year: d.year,
            total_co2: +d.total,
            total_solid_fuel: +d.total_solid_fuel,
            total_liquid_fuel: +d.total_liquid_fuel,
            total_gas_fuel: +d.total_gas_fuel,
            total_cement: +d.total_cement,
            total_gas_flaring: +d.total_gas_flaring,
            total_per_capita: +d.total_per_capita,

        }));

        const svg = d3.select(svgRef.current);
        const width = 600;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };

        // Configurar las escalas
        const x = d3
            .scaleBand()
            .domain(formattedData.map(d => d.year))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(formattedData, d => d.total_co2) as number])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Limpiar el svg antes de dibujar
        svg.selectAll('*').remove();

        // Dibujar los ejes
        svg
            .append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        svg
            .append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

        // Dibujar las barras
        svg
            .append('g')
            .selectAll('rect')
            .data(formattedData)
            .join('rect')
            .attr('x', d => x(d.year) as number)
            .attr('y', d => y(d.total_co2))
            .attr('height', d => y(0) - y(d.total_co2))
            .attr('width', x.bandwidth())
            .attr('fill', 'steelblue');
    }, [data]);

    return <svg ref={svgRef} width={600} height={400}></svg>;
};

export default BarChart;
