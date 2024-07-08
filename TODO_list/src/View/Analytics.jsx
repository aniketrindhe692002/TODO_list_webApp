import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import './Analytics.css';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Analytics = ({ todos, completedTodos }) => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const storedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos')) || [];
    const completedTodosLength = storedCompletedTodos.length;

    useEffect(() => {
        // Calculate analytics data from todos
        const calculateAnalytics = () => {
            let completedCount = 0;
            let updatedCount = 0;
            let editedCount = 0;
            let deletedCount = 0;
            let incompleteCount = 0;

            todos.forEach(todo => {
                if (todo.completed) {
                    completedCount++;
                }
                if (todo.updated) {
                    updatedCount++;
                }
                if (todo.edited) {
                    editedCount++;
                }
                if (todo.deleted) {
                    deletedCount++;
                }
                if (!todo.completed && !todo.updated && !todo.edited && !todo.deleted) {
                    incompleteCount++;
                }
            });

            // Update state with calculated analytics data
            setAnalyticsData({
                completed: completedTodosLength,
                updated: updatedCount,
                edited: editedCount,
                deleted: deletedCount,
                incomplete: incompleteCount
            });
        };

        calculateAnalytics();
    }, [todos, completedTodosLength]);

    const options = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Task Analytics"
        },
        axisY: {
            title: "Count"
        },
        axisX: {
            title: "Categories"
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "Completed", y: analyticsData ? analyticsData.completed : 0 },
                { label: "Edited", y: analyticsData ? analyticsData.edited : 0 },
                { label: "Deleted", y: analyticsData ? analyticsData.deleted : 0 },
                { label: "Incomplete", y: analyticsData ? analyticsData.incomplete : 0 }
            ]
        }]
    };

    const handleViewAnalytics = () => {
        // Function to handle view analytics button click
        console.log("View Analytics clicked");
        // You can add further logic here to expand the analytics view or show a modal
    };

    return (
        <div className="analytics-container">
            {analyticsData &&
                <CanvasJSChart options={options} className="canvasjs-chart-container" />
            }
        </div>
    );
};

export default Analytics;
