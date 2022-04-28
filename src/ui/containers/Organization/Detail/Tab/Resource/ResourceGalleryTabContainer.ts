import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import GalleryTab from "src/ui/components/Organization/Detail/DetailPanel/Resources/Tabs/Gallery";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { TypeView } from "src/entity/enums";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { GalleryItem } from "src/common/classes/GalleryItem";
import { BaseResource } from "src/common/classes/BaseResource";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    isWorking: state.AppReducer.isWorking,
    resource: state.Organization.resource,
    galleryView: state.AppReducer.galleryView,
    selectedGallery: state.Organization.selectedGallery,
    uploadItems: state.Organization.uploadItems,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnUpdateGalleryView: (type: TypeView) => {
      dispatch(ApplicationReduxActionTS.StoreUpdateGalleryView(type));
    },
    OnUpdateSelectedGalleryItems: (selectedGallery: GalleryItem[]) => {
      dispatch(
        OrganizationReduxAction.StoreSelectedGalleryItem(selectedGallery)
      );
    },
    OnUpdateWokingStatus: (val: boolean) => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnUpdateResourceEditing: (rs: BaseResource) => {
      dispatch(OrganizationReduxAction.StoreUpdateEditResource(rs));
    },
    OnUpdateUploadItems: (items: GalleryItem[]) => {
      dispatch(OrganizationReduxAction.StoreUploadItems(items));
    },
  };
};

const GalleryTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GalleryTab);

export default GalleryTabContainer;
