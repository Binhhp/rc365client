import {
  EditUserTabs,
  EditGroupTabs,
  EditResourceTabs,
} from "src/entity/enums";
import { ICloneable } from "src/common/interfaces";

export class WorkingEditTabDto {
  userTabs: EditUserTabs;
  groupTabs: EditGroupTabs;
  resourceTabs: EditResourceTabs;
}

export class WorkingEditTab implements ICloneable<WorkingEditTab> {
  protected _userTabs: EditUserTabs;
  protected _groupTabs: EditGroupTabs;
  protected _resourceTabs: EditResourceTabs;

  constructor(dto?: WorkingEditTabDto) {
    if (dto) {
      this._userTabs = dto.userTabs || EditUserTabs.Profile;
      this._groupTabs = dto.groupTabs || EditGroupTabs.General;
      this._resourceTabs = dto.resourceTabs || EditResourceTabs.General;
    } else {
      this._userTabs = EditUserTabs.Profile;
      this._groupTabs = EditGroupTabs.General;
      this._resourceTabs = EditResourceTabs.General;
    }
  }
  public get userTabs(): EditUserTabs {
    return this._userTabs;
  }
  public set userTabs(v: EditUserTabs) {
    this._userTabs = v;
  }
  public get groupTabs(): EditGroupTabs {
    return this._groupTabs;
  }
  public set groupTabs(v: EditGroupTabs) {
    this._groupTabs = v;
  }
  public get resourceTabs(): EditResourceTabs {
    return this._resourceTabs;
  }
  public set resourceTabs(v: EditResourceTabs) {
    this._resourceTabs = v;
  }
  Clone(): WorkingEditTab {
    let dto = this.ToDto();
    return new WorkingEditTab(dto);
  }
  ToDto(): WorkingEditTabDto {
    return {
      userTabs: this._userTabs,
      groupTabs: this._groupTabs,
      resourceTabs: this._resourceTabs,
    };
  }
}
