import * as React from "react";
import {
  GalleryTabWrapper,
  SearchGroupWrapper,
  GalleryItemWrapper,
  GalleryListWrapper,
  EmptyWrapper,
  MainContentWrapper,
  ItemUploadedWrapper,
} from "./GelleryStyle";
import {
  IGalleryItemProps,
  IGalleryTabProps,
  IGalleryTabState,
} from "./GalleryModels";
import SearchBox from "aod-dependencies/SearchBox/CustomSearchBox";
import Button from "aod-dependencies/Button";
import EmptyIMG from "src/assets/notification/EmptyIllustration-c1bf49c43c40b275a1de765657894875.svg";
import { Icon } from "aod-dependencies/@uifabric/icons/Icon";
import { IconButton } from "aod-dependencies/Button/IconButton/IconButton";
import Upload from "rc-upload";
import { TypeView } from "src/entity/enums";
import { BaseResource } from "src/common/classes/BaseResource";
import { IconGeneralProps } from "src/common/style";
import { GalleryItem } from "src/common/classes/GalleryItem";
import { BuildRCAttribute } from "src/common/functions";

// gallery item
const GalleryItemIMG = (props: IGalleryItemProps) => {
  let [isSelected, setSelected] = React.useState<boolean>(false);
  React.useEffect(() => {
    let newSelected = props.selectedItems
      ? props.selectedItems.some((i) => i.id === props.file.id)
      : false;
    setSelected(newSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedItems]);

  const onHandleRemoveIMG = () => {
    props.onHandleRemoveIMG(props.file.id);
  };

  const onHandleSelectIMG = () => {
    props.onHandleSelectIMG(props.file);
  };

  return (
    <GalleryItemWrapper
      className="GalleryItemWrapper"
      theme={{
        darkMode: props.theme,
        isSelected: isSelected,
        gridView: props.gridView,
      }}
    >
      <div className="gallery__imgWrapper" onClick={onHandleSelectIMG}>
        <img
          className="gallery__img"
          src={props.file.src}
          alt={`${props.file.name}-${props.file.id}`}
        />
      </div>
      <div className="gallery__removeBtn" onClick={onHandleRemoveIMG}>
        <Icon className="gallery__btn" iconName="Delete" />
      </div>
    </GalleryItemWrapper>
  );
};

// uploaded item
const UploadedItem = (props: any) => {
  const onHandleRemoveItem = () => {
    props.onHandleRemoveUploadItem(props.data.id);
  };

  return (
    <ItemUploadedWrapper theme={props.theme}>
      <img
        className="uploaded__img"
        src={props.data.src}
        alt={`${props.data.name}-${props.data.id}`}
      />
      <span className="uploaded__name">{props.data.name}</span>
      <Icon
        onClick={onHandleRemoveItem}
        className="uploaded__btn"
        iconName="StatusErrorFull"
        rcName="Upload.edtResource"
      />
    </ItemUploadedWrapper>
  );
};

export default class GalleryTab extends React.Component<
  IGalleryTabProps,
  IGalleryTabState
> {
  constructor(props: IGalleryTabProps) {
    super(props);
    this.state = {
      selectedItems: [],
      visibleText: "",
    };
  }

  uploadProps = {
    action: "/upload.do",
    multiple: true,
    // accept: ".png",
    onStart: (file: any) => {
      // console.log("onStart", file, file.name);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        if (e.target && file.type.match("image.*")) {
          this._onHandleWorkingStatus(true);
          let currentUploadItems = this.props.uploadItems
            ? [...this.props.uploadItems]
            : [];
          let result = e.target.result ? String(e.target.result) : "";
          currentUploadItems.push({
            src: result,
            id: file.uid,
            name: file.name,
            file: file,
          });
          this._onHandleUpdateUploadItems(currentUploadItems);
        }
      };
    },
    onSuccess(ret: any) {
      console.log("onSuccess", ret);
    },
    onError(err: any) {
      console.log("onError", err);
    },
  };

  componentDidMount() {
    if (this.props.OnUpdateResourceEditing && this.props.resource) {
      let crtResource = this.props.resource.Clone() as BaseResource;
      if (!crtResource.gallery || crtResource.gallery.length === 0) {
        let sample = [
          {
            src: "https://cdnmedia.thethaovanhoa.vn/Upload/mJ4IlA3Nve29hrFVp7WQ/files/2021/01/8/MU%20vs%20Watford%20660.jpg",
            id: "1",
            name: "bruno",
          },
          {
            src: "https://cdnmedia.thethaovanhoa.vn/Upload/mJ4IlA3Nve29hrFVp7WQ/files/2021/01/8/MU%20vs%20Watford%20660.jpg",
            id: "2",
            name: "bruno",
          },
          {
            src: "https://cdnmedia.thethaovanhoa.vn/Upload/mJ4IlA3Nve29hrFVp7WQ/files/2021/01/8/MU%20vs%20Watford%20660.jpg",
            id: "3",
            name: "bruno",
          },
        ];
        crtResource.gallery = sample;
        this.props.OnUpdateResourceEditing(crtResource);
      }
    }
    if (this.props.selectedGallery && this.props.selectedGallery.length > 0) {
      this.setState({ selectedItems: this.props.selectedGallery });
    }
  }

  componentWillUnmount() {
    this._onHandleUpdateSelectedItems();
  }

  private _onHandleUpdateSelectedItems = (isReset?: boolean) => {
    if (this.props.OnUpdateSelectedGalleryItems) {
      let value = isReset ? [] : this.state.selectedItems;
      this.props.OnUpdateSelectedGalleryItems(value);
    }
  };

  private _onHandleUpdateUploadItems = (items: GalleryItem[]) => {
    if (this.props.OnUpdateUploadItems) {
      this.props.OnUpdateUploadItems(items);
    }
  };

  private _onHandleWorkingStatus = (val: boolean) => {
    if (this.props.OnUpdateWokingStatus && this.props.isWorking !== val) {
      this.props.OnUpdateWokingStatus(val);
    }
  };

  private _onHandleUpdateGalleryView = (type: TypeView) => {
    if (this.props.OnUpdateGalleryView && this.props.galleryView !== type) {
      this.props.OnUpdateGalleryView(type);
    }
  };

  private _onHandleSelectItem = async (item: GalleryItem) => {
    if (this.state.selectedItems) {
      let crtSelectedItems = [...this.state.selectedItems];
      let index = crtSelectedItems.findIndex((g) => g.id === item.id);
      if (index !== -1) {
        crtSelectedItems.splice(index, 1);
      } else {
        crtSelectedItems.push(item);
      }
      this.setState({ selectedItems: crtSelectedItems });
    }
  };

  private _onHandleRemoveItem = (id: string) => {
    let index = this.props.resource
      ? this.props.resource.gallery.findIndex((g) => g.id === id)
      : -1;
    if (
      this.props.OnUpdateResourceEditing &&
      index !== -1 &&
      this.props.resource
    ) {
      let crtResource = this.props.resource.Clone() as BaseResource;
      let crtGallery = [...crtResource.gallery];
      crtGallery.splice(index, 1);
      crtResource.gallery = crtGallery;
      this.props.OnUpdateResourceEditing(crtResource);
      this._onHandleWorkingStatus(true);
      this._onHandleUpdateSelectedItems();
    }
  };

  private _onHandleRemoveSelectedItems = () => {
    if (
      this.props.resource &&
      this.state.selectedItems &&
      this.state.selectedItems.length > 0 &&
      this.props.OnUpdateResourceEditing
    ) {
      let crtResource = this.props.resource.Clone() as BaseResource;
      let crtGallery = [...crtResource.gallery];
      let newGallery = crtGallery.filter(
        (g) => !this.state.selectedItems.includes(g)
      );
      crtResource.gallery = newGallery;
      this.setState({
        selectedItems: [],
      });
      this.props.OnUpdateResourceEditing(crtResource);
      this._onHandleWorkingStatus(true);
      this._onHandleUpdateSelectedItems(true);
    }
  };

  private _onHandleRemoveUploadItem = (id: string) => {
    if (this.props.uploadItems) {
      let crtItems = [...this.props.uploadItems];
      let index = crtItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        crtItems.splice(index, 1);
      }
      this._onHandleUpdateUploadItems(crtItems);
    }
  };

  private _onHandleScroll = (
    event: React.MouseEvent<HTMLDivElement, UIEvent>
  ): void => {
    let listItem = document.getElementById("GalleryListWrapper");
    if (
      listItem &&
      Math.ceil(listItem.scrollTop) ===
        listItem.scrollHeight - listItem.offsetHeight &&
      this.props.resource
    ) {
      let crtResource = this.props.resource.Clone() as BaseResource;
      let crtGallery = [...crtResource.gallery];

      if (
        crtGallery &&
        crtGallery.length < 20 &&
        this.props.OnUpdateResourceEditing
      ) {
        crtGallery.push({
          src: "https://cdnmedia.thethaovanhoa.vn/Upload/mJ4IlA3Nve29hrFVp7WQ/files/2021/01/8/MU%20vs%20Watford%20660.jpg",
          id: `${crtGallery && crtGallery.length + 1}-${Math.floor(
            Math.random() * 100000
          )}`,
          name: "bruno",
        });
        crtResource.gallery = crtGallery;
        this.props.OnUpdateResourceEditing(crtResource);
      }
    }
  };

  onSearchWhenStopTyping = (
    event?: React.ChangeEvent<HTMLInputElement>,
    str?: string
  ): void => {
    const self = this;
    // if (self.state.typingTimeout) {
    //   clearTimeout(self.state.typingTimeout);
    // }
    self.setState({
      visibleText: str || "",
      // isSearching: true,
      // isSomeResourceAlreadyAdded: false,
      // typeList: TypeSearchList.Searching,
      // typingTimeout: window.setTimeout(() => {
      //   let rs = this._HandleConcatSelectedAndSource();
      //   this.setState({
      //     isSearching: false,
      //     searchingText: str ? str.trim() : "",
      //     prevItems: [],
      //     selectedItems: [],
      //     sourceItems: rs,
      //   });
      // }, 1000),
    });
  };

  render() {
    let idEmpty = BuildRCAttribute("blk.empty");
    return (
      <MainContentWrapper
        className="MainContentWrapper"
        theme={this.props.theme}
      >
        <GalleryTabWrapper
          className="GalleryTabWrapper"
          theme={this.props.theme}
        >
          <SearchGroupWrapper
            className="SearchGroupWrapper"
            theme={this.props.theme}
          >
            <div className="searchGr__action">
              <div className="search__gr">
                <IconButton
                  title="Large"
                  ariaLabel="Large"
                  iconProps={IconGeneralProps.gridViewLargeIcon}
                  onClick={() =>
                    this._onHandleUpdateGalleryView(TypeView.Large)
                  }
                />
                <IconButton
                  title="Medium"
                  ariaLabel="Medium"
                  iconProps={IconGeneralProps.gridViewMediumIcon}
                  onClick={() =>
                    this._onHandleUpdateGalleryView(TypeView.Medium)
                  }
                />
                <SearchBox
                  rcName="edtResource"
                  darkMode={this.props.theme}
                  placeholder="Search"
                  id="search-input"
                  className="searchBox"
                  value={this.state.visibleText}
                  onChange={this.onSearchWhenStopTyping}
                  onBlur={() =>
                    this.setState({
                      visibleText: this.state.visibleText.trim(),
                    })
                  }
                />
              </div>
              <div className="search__btnGr">
                <Upload {...this.uploadProps}>
                  <Button
                    type="Primary"
                    darkMode={this.props.theme}
                    text="Upload"
                    rcName="Upload.edtResource"
                    className="btnUpload"
                  />
                </Upload>
                <IconButton
                  rcName="Remove.edtResource"
                  title="Remove"
                  ariaLabel="Remove"
                  iconProps={IconGeneralProps.deleteIcon}
                  disabled={
                    this.state.selectedItems &&
                    this.state.selectedItems.length > 0
                      ? false
                      : true
                  }
                  onClick={this._onHandleRemoveSelectedItems}
                />
              </div>
            </div>
            <div className="searchGr__result">
              {this.props.uploadItems &&
                this.props.uploadItems.length > 0 &&
                this.props.uploadItems.map((item) => {
                  return (
                    <UploadedItem
                      data={item}
                      theme={this.props.theme}
                      key={item.id}
                      onHandleRemoveUploadItem={this._onHandleRemoveUploadItem}
                    />
                  );
                })}
            </div>
          </SearchGroupWrapper>
          {this.props.resource &&
          this.props.resource.gallery &&
          this.props.resource.gallery.length > 0 ? (
            <GalleryListWrapper
              onScroll={this._onHandleScroll}
              theme={{
                darkMode: this.props.theme,
                typeView: this.props.galleryView,
              }}
              id="GalleryListWrapper"
              className="GalleryListWrapper"
            >
              {this.props.resource.gallery.map((img, index) => {
                return (
                  <GalleryItemIMG
                    file={img}
                    key={index}
                    index={index}
                    theme={this.props.theme}
                    onHandleRemoveIMG={this._onHandleRemoveItem}
                    onHandleSelectIMG={this._onHandleSelectItem}
                    selectedItems={this.state.selectedItems}
                    gridView={this.props.galleryView}
                  />
                );
              })}
            </GalleryListWrapper>
          ) : (
            <EmptyWrapper
              {...idEmpty}
              className="EmptyWrapper"
              theme={this.props.theme}
            >
              <img src={EmptyIMG} alt="empty_img" />
              <h4>You don't have any image</h4>
            </EmptyWrapper>
          )}
        </GalleryTabWrapper>
      </MainContentWrapper>
    );
  }
}
