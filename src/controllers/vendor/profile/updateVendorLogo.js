import { Vendor } from "../../../models/vendor.js";
import validatePhoto from "../../../utils/joi/validatePhoto.js";
import updatePhotoFactory from "../../profile/updatePhotoFactory.js";

const updateVendorLogoController = updatePhotoFactory({
  ProfileModel: Vendor,
  validateSchema: validatePhoto,
  profileName: "Vendor",
  fieldName: "logo",
});

export default updateVendorLogoController;
