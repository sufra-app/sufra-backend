import { Customer } from "../../../models/customer.js";
import validateUpdateCustomer from "../../../utils/joi/customer/profile/validateUpdateCustomer.js";
import updateProfileFactory from "../../profile/updateProfileFactory.js";
const updateCutomerProfileController = updateProfileFactory({
  ProfileModel: Customer,
  validateSchema: validateUpdateCustomer,
  profileName: "Customer",
});
export default updateCutomerProfileController;
