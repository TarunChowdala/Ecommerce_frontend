import "./index.css";

const Spinner = ({ color = "white", size = 20 }) => {
  return (
    <div
      className="black-spinner"
      style={{
        borderTopColor: color,
        width: size,
        height: size,
        borderWidth: size / 7,
      }}
    ></div>
  );
};

export default Spinner;
