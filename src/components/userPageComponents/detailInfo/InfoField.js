const InfoField = (props) => {
  return (
    <p>
      <span className="underline">{props.label}:</span> {props.value}
    </p>
  );
};

export default InfoField;
