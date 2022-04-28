import styled from "styled-components";
import { ActionButtonWrapper } from "src/ui/components/Sensor/Content/ContentStyle";

export const SensorTabWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const SearchWrapper = styled.div`
  .search__wrapper .SearchBoxWrapper {
    padding: 5px 0 10px 0;
  }
`;

export const ActionWrapper = styled(ActionButtonWrapper)`
  padding: 5px 0 !important;
  .item_searchLabel {
    padding-bottom: 5px;
    font-size: 15px;
    font-weight: 600;
  }
`;
