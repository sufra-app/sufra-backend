import { Customer } from "../../../models/customer.js";
import validatePhoto from "../../../utils/joi/validatePhoto.js";

import updatePhotoFactory from "../../profile/updatePhotoFactory.js";

const updateCustomerPhotoController = updatePhotoFactory({
  ProfileModel: Customer,
  validateSchema: validatePhoto,
  profileName: "Customer",
  fieldName: "profileImage",
});

export default updateCustomerPhotoController;
