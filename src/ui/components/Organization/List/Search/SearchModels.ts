import { BaseOrganization } from "src/common/classes/BaseOrganization";

export interface ISearchProps {
  theme: string;
  data: BaseOrganization[];
  onGetFilterData: (val: BaseOrganization[] | null) => void;
}

export interface ISearchState {
  isHaveTyping: boolean;
  isLoadingSearch: boolean;
  typingTimeout: number;
  text: string;
}
