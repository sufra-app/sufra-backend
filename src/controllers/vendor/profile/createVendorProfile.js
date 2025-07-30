import { Vendor } from "../../../models/vendor.js";
import validateVendor from "../../../utils/joi/vendor/profile/validateVendor.js";
import createProfileFactory from "../../profile/createProfileFactory.js";

const createVendorProfileController = createProfileFactory({
  ProfileModel: Vendor,
  validateSchema: validateVendor,
  profileName: "Vendor",
});

export default createVendorProfileController;
