import "./ContentBody.css";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { HourlyForecastData } from "../Content";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";

Chart.register(...registerables);

type ActiveGraph =
  | "temperature"
  | "humidity"
  | "apparentTemperature"
  | "cloudCover"
  | "uvIndex";

function ContentBody(props: { hourlyForecast: HourlyForecastData | null }) {
  const { hourlyForecast } = props;

  const [activeGraph, setActiveGraph] = useState<ActiveGraph>("temperature");

  let elementRender;
  if (hourlyForecast) {
    const labels = hourlyForecast.data.time.map((e) => {
      const date = new Date(e);

      return `${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    });

    const label = activeGraph.replace(/([a-z])([A-Z])/g, "$1 $2");

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: label.charAt(0).toUpperCase() + label.slice(1),
        },
      },
    };

    const data = {
      labels,
      datasets: [
        {
          label: label.charAt(0).toUpperCase() + label.slice(1),
          data: hourlyForecast.data[activeGraph],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };

    elementRender = (
      <>
        <div className="main-forecast__chart-nav">
          {Object.keys(hourlyForecast.units)
            .filter((e) => e !== "time")
            .map((e: string) => (
              <button
                onClick={() => {
                  setActiveGraph(e as ActiveGraph);
                }}
              >
                {e.replace(/([a-z])([A-Z])/g, "$1 $2")}
              </button>
            ))}
        </div>
        <Line
          options={options}
          data={data}
          className="main-forecast__chart"
          updateMode="resize"
          fallbackContent="Line graph can't load"
        />
        <div className="main-forecast__message">
          <p>graph look so bad in this screen (to be fixed)</p>
        </div>
      </>
    );
  } else {
    elementRender = <ThreeDots />;
  }

  return (
    <div className="main-forecast__chart-div">
      {elementRender}
      {/* <Line options={options} data={data} className="main-forecast__chart" /> */}
    </div>
  );
}

export default ContentBody;
