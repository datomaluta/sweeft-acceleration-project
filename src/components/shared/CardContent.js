const CardContent = (props) => {
  return (
    <>
      <div className="w-full">
        <img
          className="w-full  lg:max-h-[20rem] h-full object-cover"
          src={props.user.imageUrl + "/" + props.user.id}
          alt="avatar"
        />
      </div>
      <div className="px-2">
        <p className="font-bold">
          {props.user.prefix} {props.user.name} {props.user.lastName}
        </p>
        <p>{props.user.title}</p>
      </div>
    </>
  );
};
export default CardContent;
