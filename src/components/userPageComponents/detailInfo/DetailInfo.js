import InfoField from "./InfoField";

const DetailInfo = (props) => {
  return (
    <div className="flex items-center justify-between px-4 lg:flex-col lg:gap-4">
      <div className="w-full lg:h-80 sm:h-52 overflow-hidden max-w-[16.5rem] mr-4 lg:mr-0 flex-grow lg:max-w-full">
        <img
          className="w-full h-full object-fill"
          src={props.user.imageUrl + "/" + props.user.id}
          alt="mainphoto"
        />
      </div>
      <fieldset className="border border-black px-4 pb-2 w-full max-w-[41.875rem] lg:max-w-full">
        <legend className="px-1">Info</legend>
        <p className="font-bold">
          {props.user.prefix} {props.user.name} {props.user.lastName}
        </p>
        <p className="italic mb-6">{props.user.title}</p>
        <InfoField value={props.user.email} label="Email" />
        <InfoField value={props.user.ip} label="Ip Address" />
        <InfoField value={props.user.jobArea} label="Job Area" />
        <InfoField value={props.user.jobType} label="Job Type" />
      </fieldset>
      <fieldset className="border w-full border-black py-2 px-2 max-w-[12rem] ml-2 lg:ml-0 lg:max-w-full">
        <legend className="px-1">Address</legend>
        <p className="font-bold">
          {props.user.company.name + " " + props.user.company.suffix}
        </p>
        <InfoField value={props.user.address.city} label="City" />
        <InfoField value={props.user.address.country} label="Country" />
        <InfoField value={props.user.address.state} label="State" />
        <InfoField
          value={props.user.address.streetAddress}
          label="Street Address"
        />
        <InfoField value={props.user.address.zipCode} label="Zip" />
      </fieldset>
    </div>
  );
};
export default DetailInfo;
