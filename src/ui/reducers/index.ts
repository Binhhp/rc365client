import { combineReducers } from "redux";
import NotificationsReducer from "./NotificationsReducer";
import settingsReducer from "./SettingsReducer";
import userReducer from "./UserReducer";
import AppReducer from "./AppReducer";
import Organization from "./OrganizationReducer";
import Tenant from "./TenantReducer";
import Sensor from "./SensorReducer";
import Calendar from "./CalendarReducer";

const appReducers = combineReducers({
  NotificationsReducer,
  settingsReducer,
  userReducer,
  AppReducer,
  Organization,
  Tenant,
  Sensor,
  Calendar,
});

export type appReducers = ReturnType<typeof appReducers>;
export default appReducers;
