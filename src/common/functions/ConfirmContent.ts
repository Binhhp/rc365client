import { TypeConfirm } from "src/entity/enums";

export const RenderContentByConfirmType = (type?: TypeConfirm) => {
  if (type) {
    switch (type) {
      case TypeConfirm.Submit:
      case TypeConfirm.Update:
      case TypeConfirm.Review:
        return "Do you want to save your changes?";

      case TypeConfirm.Cancel:
        return "Changes that you made may not be saved. \nMakes you sure you want to close?";

      case TypeConfirm.Delete:
        return "Do you want to delete the selected record(s)?";

      default:
        return "Do you really want to save these changes?";
    }
  }
  return "";
};
