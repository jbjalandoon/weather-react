import "./ForecastItemDate.css";

function ForecastItemDate(props: { month: string; week: string; day: string }) {
  const { month, day } = props;

  return (
    <div className="content-item__date">
      <span className="content-item__month">{month}</span>
      <span className="content-item__day">{day}</span>
    </div>
  );
}

export default ForecastItemDate;
