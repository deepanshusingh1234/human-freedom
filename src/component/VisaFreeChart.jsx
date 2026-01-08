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
                paddingRight: 0
            })
        );

        // Add scrollbars
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

        // Add zoom controls
        let zoomControl = chart.plotContainer.children.push(
            am5.Button.new(root, {
                dx: 10,
                dy: 10,
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10,
                themeTags: ["zoom"]
            })
        );

        zoomControl.get("background").setAll({
            fill: am5.color(0xffffff),
            fillOpacity: 0.8,
            stroke: am5.color(0xcccccc),
            strokeWidth: 1
        });

        zoomControl.children.push(
            am5.Label.new(root, {
                text: "Reset Zoom",
                fontSize: 12,
                fill: am5.color(0x666666)
            })
        );

        zoomControl.events.on("click", () => {
            xAxis.zoomToCategories(xAxis.get("start") || 0, xAxis.get("end") || chartData.length - 1);
            yAxis.zoomToValues(0, 100);
        });

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

        // Add zoom in/out buttons
        let zoomInButton = chart.plotContainer.children.push(
            am5.Button.new(root, {
                dx: 10,
                dy: 40,
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10,
                themeTags: ["zoom"]
            })
        );

        zoomInButton.get("background").setAll({
            fill: am5.color(0xffffff),
            fillOpacity: 0.8,
            stroke: am5.color(0xcccccc),
            strokeWidth: 1
        });

        zoomInButton.children.push(
            am5.Label.new(root, {
                text: "+",
                fontSize: 14,
                fontWeight: "bold",
                fill: am5.color(0x666666)
            })
        );

        zoomInButton.events.on("click", () => {
            let yRange = yAxis.getPrivate("end") - yAxis.getPrivate("start");
            let newRange = yRange * 0.7;
            let center = (yAxis.getPrivate("end") + yAxis.getPrivate("start")) / 2;
            let newStart = Math.max(0, center - newRange / 2);
            let newEnd = Math.min(100, center + newRange / 2);
            yAxis.zoomToValues(newStart, newEnd);
        });

        let zoomOutButton = chart.plotContainer.children.push(
            am5.Button.new(root, {
                dx: 10,
                dy: 70,
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10,
                themeTags: ["zoom"]
            })
        );

        zoomOutButton.get("background").setAll({
            fill: am5.color(0xffffff),
            fillOpacity: 0.8,
            stroke: am5.color(0xcccccc),
            strokeWidth: 1
        });

        zoomOutButton.children.push(
            am5.Label.new(root, {
                text: "-",
                fontSize: 14,
                fontWeight: "bold",
                fill: am5.color(0x666666)
            })
        );

        zoomOutButton.events.on("click", () => {
            let yRange = yAxis.getPrivate("end") - yAxis.getPrivate("start");
            let newRange = yRange * 1.3;
            let center = (yAxis.getPrivate("end") + yAxis.getPrivate("start")) / 2;
            let newStart = Math.max(0, center - newRange / 2);
            let newEnd = Math.min(100, center + newRange / 2);

            if (newEnd - newStart >= 100) {
                yAxis.zoomToValues(0, 100);
            } else {
                yAxis.zoomToValues(newStart, newEnd);
            }
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

        // Store references
        chartRef.current = { root, chart };

        // Cleanup function
        return () => {
            if (chartRef.current && chartRef.current.root) {
                chartRef.current.root.dispose();
            }
        };
    }, []);

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Visa-Free Freedom Index over Time (amCharts)
            </h3>

            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">


                {/* Chart container */}
                <div
                    id="chartdiv"
                    style={{
                        width: "100%",
                        height: "500px",
                        backgroundColor: "#ffffff",
                        borderRadius: "8px"
                    }}
                ></div>


            </div>
        </div>
    );
};

export default VisaFreeChartAmCharts;