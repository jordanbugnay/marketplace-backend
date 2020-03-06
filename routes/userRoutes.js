import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "../database/user";
import errorCodes from "../lib/errorCodes";
import validate from "./userRoutes.validate";

const ID_DOES_NOT_EXIST = "id does not exist";

export default app => {
  app.post("/user", async (req, res) => {
    const { body = {} } = req;
    const payloadValidation = validate.postUser(body);

    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }

    try {
      const user = await createUser(body);

      if (!user.created) {
        return res.send(
          errorCodes.duplicateResource({
            message: "User email already exists."
          })
        );
      }

      return res.send(user.user);
    } catch (error) {
      return res.send(errorCodes.badRequest({ message: error }));
    }
  });
};
