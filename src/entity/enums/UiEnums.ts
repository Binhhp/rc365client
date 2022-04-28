import { IconGeneralProps } from "src/common/style";
import { TypePage } from "./TypeEnums";

export const OrganizationItemTagList = [
  {
    text: "Domains",
    iconName: IconGeneralProps.domainIcon.iconName || "",
    total: 0,
    tab: TypePage.Domains,
  },
  {
    text: "Users",
    iconName: IconGeneralProps.userIcon.iconName || "",
    total: 0,
    tab: TypePage.Users,
  },
  {
    text: "Resources",
    iconName: IconGeneralProps.resourceIcon.iconName || "",
    total: 0,
    tab: TypePage.Resources,
  },
  {
    text: "Groups",
    iconName: IconGeneralProps.groupIcon.iconName || "",
    total: 0,
    tab: TypePage.Groups,
  },
];
