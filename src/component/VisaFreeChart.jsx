// components/VisaFreeChartAmCharts.jsx
import React, { useEffect, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { chartData } from '../Data/Data';

const VisaFreeChartAmCharts = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Create root element
        let root = am5.Root.new("chartdiv");
        root.setThemes([am5themes_Animated.new(root)]);

        // Create chart
        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomXY",
                pinchZoomX: true,
                pinchZoomY: true,
                cursor: am5xy.XYCursor.new(root, {}),
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 40 // For scrollbar
            })
        );

        // Add scrollbars (KEEPING THESE AS REQUESTED)
        chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal"
        }));

        chart.set("scrollbarY", am5.Scrollbar.new(root, {
            orientation: "vertical"
        }));

        // Create axes
        let xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                renderer: am5xy.AxisRendererX.new(root, {
                    minGridDistance: 30
                }),
                categoryField: "year",
                tooltip: am5.Tooltip.new(root, {})
            })
        );

        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {}),
                min: 0,
                max: 100,
                strictMinMax: true,
                extraMin: 0.1,
                extraMax: 0.1
            })
        );

        // REMOVED: Zoom control button (reset zoom button)

        // Create series
        let series = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: "Visa-Free Index",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "freedomIndex",
                categoryXField: "year",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{year}: {valueY}%",
                    themeTags: ["tooltip"]
                }),
                stroke: am5.color(0x67b7dc),
                fill: am5.color(0x67b7dc)
            })
        );

        // Add bullets (data points)
        series.bullets.push(() => {
            return am5.Bullet.new(root, {
                sprite: am5.Circle.new(root, {
                    radius: 4,
                    fill: am5.color(0xffffff),
                    stroke: am5.color(0x67b7dc),
                    strokeWidth: 2
                })
            });
        });

        // Set data
        series.data.setAll(chartData);
        xAxis.data.setAll(chartData);

        // Add cursor
        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "zoomXY",
            xAxis: xAxis,
            yAxis: yAxis
        }));

        cursor.lineY.set("visible", false);
        cursor.lineX.set("visible", false);

        // REMOVED: Zoom in button (+)
        // REMOVED: Zoom out button (-)

        // Double click to reset zoom (alternative to removed button)
        chart.plotContainer.events.on("dblclick", () => {
            xAxis.zoomToCategories(xAxis.get("start") || 0, xAxis.get("end") || chartData.length - 1);
            yAxis.zoomToValues(0, 100);
        });

        // Add legend
        let legend = chart.children.push(
            am5.Legend.new(root, {
                nameField: "name",
                fillField: "fill",
                strokeField: "stroke",
                centerX: am5.p50,
                x: am5.p50,
                dy: 30
            })
        );

        legend.data.setAll([{
            name: "Visa-Free Freedom Index",
            fill: am5.color(0x67b7dc),
            stroke: am5.color(0x67b7dc)
        }]);

        // Make chart responsive
        const handleResize = () => {
            if (chartRef.current && chartRef.current.root) {
                chartRef.current.root.resize();
            }
        };

        // Add resize listener
        window.addEventListener('resize', handleResize);

        // Store references
        chartRef.current = { root, chart };

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartRef.current && chartRef.current.root) {
                chartRef.current.root.dispose();
            }
        };
    }, []);

    return (
        <div className="mt-8 md:mt-12 px-2 md:px-0">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
                Visa-Free Freedom Index over Time
            </h3>

            <div className="bg-white rounded-lg md:rounded-xl shadow-sm md:shadow-md border border-gray-200 p-3 md:p-6">


                {/* Chart container with responsive height */}
                <div className="relative">
                    <div
                        id="chartdiv"
                        style={{
                            width: "100%",
                            height: "450px",
                            minHeight: "300px",
                            backgroundColor: "#ffffff",
                            borderRadius: "8px"
                        }}
                        className="md:h-[450px] lg:h-[450px]"
                    ></div>
                </div>


            </div>
        </div>
    );
};

export default VisaFreeChartAmCharts;