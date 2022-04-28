import { ThemeEnums, TypeView } from "src/entity/enums";
import { GalleryItem } from "src/common/classes/GalleryItem";
import { BaseResource } from "src/common/classes/BaseResource";

export interface IGalleryTabProps {
  theme?: ThemeEnums;
  selectedGallery?: GalleryItem[];
  uploadItems?: GalleryItem[];
  galleryView?: TypeView;
  isWorking?: boolean;
  resource?: BaseResource;
  OnUpdateGalleryView?: (type: TypeView) => void;
  OnUpdateWokingStatus?: (val: boolean) => void;
  OnUpdateResourceEditing?: (rs: BaseResource) => void;
  OnUpdateUploadItems?: (items: GalleryItem[]) => void;
  OnUpdateSelectedGalleryItems?: (selectedGallery: GalleryItem[]) => void;
}

export interface IGalleryTabState {
  selectedItems: GalleryItem[];
  visibleText: string;
}

export interface IGalleryItemProps {
  file: GalleryItem;
  theme?: ThemeEnums;
  onHandleRemoveIMG: (id: string) => void;
  onHandleSelectIMG: (img: any) => void;
  selectedItems: GalleryItem[];
  gridView?: TypeView;
  index: number;
}
