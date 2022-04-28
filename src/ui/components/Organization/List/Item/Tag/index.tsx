import * as React from "react";
import { IRenderTag } from "./TagModels";
import { BuildRCAttribute } from "src/common/functions";
import { useDispatch } from "react-redux";
import Tooltip from "aod-dependencies/Tooltip/CustomToolTip";
import { TagItemWrapper } from "./TagStyle";
import { Icon } from "aod-dependencies/@uifabric/icons/Icon";
import { Link } from "react-router-dom";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";

const RenderTag = (props: IRenderTag) => {
  const dispatch = useDispatch();
  const onHandleSetDefaultTab = () => {
    dispatch(OrganizationReduxAction.StoreUpdateWorkingTab(props.data.tab));
  };
  let idRc = BuildRCAttribute(`tag.${props.data.text}.${props.orgName}`);
  let idNumber = BuildRCAttribute(`tag.number.${props.data.text}`);
  return (
    <Tooltip content={props.data.text} darkMode={props.theme}>
      {props.isWorkingOnCreate ? (
        <div className="item__tag" onClick={props.onHandleRemoveOrganization}>
          <TagItemWrapper className="TagItemWrapper" theme={props.theme}>
            <Icon
              className="item__icon"
              rcName={props.data.text}
              iconName={props.data.iconName}
            />
            <span className="item__number" {...idNumber}>
              {props.data.total}
            </span>
          </TagItemWrapper>
        </div>
      ) : (
        <Link
          className="item__tag"
          to={{ pathname: "/", search: `?orgId=${props.orgId}` }}
          onClick={onHandleSetDefaultTab}
          style={{
            textDecoration: "none",
          }}
          {...idRc}
        >
          <TagItemWrapper className="TagItemWrapper" theme={props.theme}>
            <Icon
              className="item__icon"
              rcName={props.data.text}
              iconName={props.data.iconName}
            />
            <span className="item__number" {...idNumber}>
              {props.data.total}
            </span>
          </TagItemWrapper>
        </Link>
      )}
    </Tooltip>
  );
};

export default RenderTag;
