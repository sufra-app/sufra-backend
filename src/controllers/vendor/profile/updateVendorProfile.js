import { Vendor } from "../../../models/vendor.js";
import validateUpdateVendor from "../../../utils/joi/vendor/profile/validateUpdateVendor.js";
import updateProfileFactory from "../../profile/updateProfileFactory.js";
const updateVendorProfileController = updateProfileFactory({
  ProfileModel: Vendor,
  validateSchema: validateUpdateVendor,
  profileName: "Vendor",
});
export default updateVendorProfileController;
