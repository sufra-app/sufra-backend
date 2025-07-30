import { Customer } from "../../../models/customer.js";
import validateCustomer from "../../../utils/joi/customer/profile/validateCutsomer.js";
import createProfileFactory from "../../profile/createProfileFactory.js";

const createCustomerProfileController = createProfileFactory({
  ProfileModel: Customer,
  validateSchema: validateCustomer,
  profileName: "Customer",
});

export default createCustomerProfileController;
