import { CDN_URL } from "../utils/constant";

//3. Restaurant Card
const RestaurantCard = (props) => {
  const { resData } = props;

  return (
    <div className="m-4 p-4 w-[250px] min-h-fit bg-gray-100 rounded-lg hover:bg-gray-200 transition-all ">
      <div className="p-4 ">
        <img
          alt="LOGO"
          className="h-30 w-30"
          src={CDN_URL + resData.info?.cloudinaryImageId}
        />
      </div>
      <div>
        <h3>{resData.info?.name}</h3>
        <h4>{resData.info?.cuisines.join(", ")}</h4>
        <h4>{resData.info?.avgRating} stars</h4>
        <h4>{resData.info?.sla.deliveryTime} mins</h4>
        <h4>{resData.info?.costForTwo}</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;

//Higher Order Components -- takes component as a input and returns a component
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <>
        <label className="bg-black text-white p-2 m-2 rounded-md">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </>
    );
  };
};
