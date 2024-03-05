import "./ForecastItemImage.css";

function ForecastItemImage(props: { img: string }) {
  const { img } = props;

  return <img src={img} className="content__side-forecast-img" />;
}

export default ForecastItemImage;
