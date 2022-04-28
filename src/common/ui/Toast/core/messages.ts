import { 
    LeaveGroupsTGrRequests, 
    LeaveGroupsTRsRequests, 
    LeaveGroupsTUsRequests 
} from 'src/repositories/request/Organizations/LeaveGroupRequests';
import { 
    JoinAsMemberOfGroupsTRsRequests, 
    JoinAsMemberOfGroupsTGrRequests, 
    JoinAsMemberOfGroupsTUsRequests 
} from 'src/repositories/request/Organizations/JoinAsMemberOfGroupsRequests';
import { UnRegisterGroupsRequest } from 'src/repositories/request/UnRegisterGroupsRequest';
import { RegisterGroupsRequest, UpdateGroupRequest } from 'src/repositories/request/Organizations/GroupRequest';
import { 
    AddMemberToGroupTGrRequest, 
    AddMemberToGroupTUsRequest, 
    AddMemberToGroupTRsRequest 
} from 'src/repositories/request/Organizations/AddMemberToGroupRequests';
import { 
    CreateOrganizationRequest,
    CreateTenantRequest, 
    RegisterResourceRequest, 
    StopSyncSelectedUserRequest, 
    SyncSelectedUserRequest, 
    UnregisterResourceRequest, 
    UpdateConfigurationRequest, 
    UpdateResourceRequest, 
    UpdateStorageConfigurationRequest,
} from "src/repositories/request";
import { IToastMessageBase, ToastMessageBase } from "../ToastNotificationModel";

export class ToastMessageProvider{
    static Built(request: any): IToastMessageBase | undefined {
        try{
            if(!request) return undefined;
            switch(true){
                // Tenant
                case request instanceof CreateTenantRequest:
                    return new ToastMessageBase()
                        .Promise(`Creating tenant`, `Creating tenant ${request.Owner?.Email}`)
                        .Completed(`Create tenant`, `Created tenant ${request.Owner?.Email}`)
                        .Built();
                case request instanceof UpdateConfigurationRequest:
                    const rUc = request as UpdateConfigurationRequest;
                    return new ToastMessageBase()
                        .Promise(`Updating`, `Updating ${rUc.Configurations.length} configurations`)
                        .Completed(`Update configuration`, `Updated ${rUc.Configurations.length} configurations`)
                        .Built();
                case request instanceof UpdateStorageConfigurationRequest:
                    const rUTc = request as UpdateStorageConfigurationRequest;
                    return new ToastMessageBase()
                        .Promise(`Updating storage configuration`, `Updating storage ${rUTc.Configurations.length} configurations`)
                        .Completed(`Update storage configuration`, `Updated storage ${rUTc.Configurations.length} configurations`)
                        .Built();
                // Organization
                case request instanceof CreateOrganizationRequest:
                    const cO = request as CreateOrganizationRequest;
                    return new ToastMessageBase()
                        .Promise(`Creating organization`, `Creating organization ${cO.Name}`)
                        .Completed(`Create organization`, `Created organization ${cO.Name}`)
                        .Built();
                // Group
                case request instanceof AddMemberToGroupTGrRequest:
                    const aMG = request as AddMemberToGroupTGrRequest;
                    return new ToastMessageBase()
                        .Promise(`Adding groups`, `Adding ${aMG.ChildGroupIds.length} groups`)
                        .Completed(`Add groups`, `Added ${aMG.ChildGroupIds.length} groups`)
                        .Built();
                case request instanceof RegisterGroupsRequest:
                    const rG = request as RegisterGroupsRequest;
                    return new ToastMessageBase()
                        .Promise(`Registering groups`, `Registering ${rG.SynchronizeGroups.length} groups`)
                        .Completed(`Register resources`, `Registered ${rG.SynchronizeGroups.length} groups`)
                        .Built();
                case request instanceof UnRegisterGroupsRequest:
                    const uRG = request as UnRegisterGroupsRequest;
                    return new ToastMessageBase()
                        .Promise(`UnRegistering resources`, `UnRegistering ${uRG.UnsynchronizeGroups.length} groups`)
                        .Completed(`Register resources`, `Registered ${uRG.UnsynchronizeGroups.length} groups`)
                        .Built();
                case request instanceof UpdateGroupRequest:
                    const uG = request as UpdateGroupRequest;
                    return new ToastMessageBase()
                        .Promise(`Updating group`, `Updating ${uG.Email}`)
                        .Completed(`Update group`, `Updated ${uG.Email}`)
                        .Built();
                case request instanceof JoinAsMemberOfGroupsTGrRequests:
                    const jMG = request as JoinAsMemberOfGroupsTGrRequests;
                    return new ToastMessageBase()
                        .Promise(`Adding groups`, `Adding ${jMG.GroupIds.length} groups`)
                        .Completed(`Add groups`, `Added ${jMG.GroupIds.length} groups`)
                        .Built();
                case request instanceof LeaveGroupsTGrRequests:
                    const lGG = request as LeaveGroupsTGrRequests;
                    return new ToastMessageBase()
                        .Promise(`Leaving groups`, `Leaving ${lGG.GroupIds.length} groups`)
                        .Completed(`Leave groups`, `Leaved ${lGG.GroupIds.length} groups`)
                        .Built();
                // User
                case request instanceof AddMemberToGroupTUsRequest:
                    const aMU = request as AddMemberToGroupTUsRequest;
                    return new ToastMessageBase()
                        .Promise(`Adding users`, `Adding ${aMU.UserIds.length} users`)
                        .Completed(`Add users`, `Added ${aMU.UserIds.length} users`)
                        .Built();
                case request instanceof JoinAsMemberOfGroupsTUsRequests:
                    const jMU = request as JoinAsMemberOfGroupsTUsRequests;
                    return new ToastMessageBase()
                        .Promise(`Adding groups`, `Adding ${jMU.GroupIds.length} groups`)
                        .Completed(`Add groups`, `Added ${jMU.GroupIds.length} groups`)
                        .Built();

                case request instanceof LeaveGroupsTUsRequests:
                    const lGU = request as LeaveGroupsTUsRequests;
                    return new ToastMessageBase()
                        .Promise(`Leaving users`, `Leaving ${lGU.GroupIds.length} users`)
                        .Completed(`Leave users`, `Leaved ${lGU.GroupIds.length} users`)
                        .Built();
                // Resource
                case request instanceof RegisterResourceRequest:
                    const rRR = request as RegisterResourceRequest;
                    return new ToastMessageBase()
                        .Promise(`Registering resources`, `Registering ${rRR.SynchronizeResources.length} resources`)
                        .Completed(`Register resources`, `Registered ${rRR.SynchronizeResources.length} resources`)
                        .Built();
                case request instanceof UnregisterResourceRequest:
                    const uRR = request as UnregisterResourceRequest;
                    return new ToastMessageBase()
                        .Promise(`Deleting resources`, `Deleting ${uRR.ResourceIds.length} resources`)
                        .Completed(`Delete resources`, `Deleted ${uRR.ResourceIds.length} resources`)
                        .Built();
                case request instanceof UpdateResourceRequest:
                    const uR = request as UpdateResourceRequest;
                    return new ToastMessageBase()
                        .Promise(`Updating resource`, `Updating resource ${uR.Resource.Name}`)
                        .Completed(`Update resource`, `Updated resource ${uR.Resource.Name}`)
                        .Built();
                case request instanceof AddMemberToGroupTRsRequest:
                    const aMR = request as AddMemberToGroupTRsRequest;
                    return new ToastMessageBase()
                        .Promise(`Adding resources`, `Adding ${aMR.ResourceIds.length} resources`)
                        .Completed(`Add resources`, `Added ${aMR.ResourceIds.length} resources`)
                        .Built();
                case request instanceof JoinAsMemberOfGroupsTRsRequests:
                    const jMR = request as JoinAsMemberOfGroupsTRsRequests;
                    return new ToastMessageBase()
                        .Promise(`Adding groups`, `Adding ${jMR.GroupIds.length} groups`)
                        .Completed(`Add groups`, `Added ${jMR.GroupIds.length} groups`)
                        .Built();

                case request instanceof SyncSelectedUserRequest:
                    const sSU = request as SyncSelectedUserRequest;
                    return new ToastMessageBase()
                        .Promise(`Syncing ${sSU.UserAndResourceRequests[0].Type.toLowerCase()}`, `Syncing ${sSU.UserAndResourceRequests.length} ${sSU.UserAndResourceRequests[0].Type.toLowerCase()}s`)
                        .Completed(`Sync ${sSU.UserAndResourceRequests[0].Type.toLowerCase()}`, `Synced ${sSU.UserAndResourceRequests.length} ${sSU.UserAndResourceRequests[0].Type.toLowerCase()}s`)
                        .Built();
                case request instanceof StopSyncSelectedUserRequest:
                    const sSSU = request as StopSyncSelectedUserRequest;
                    return new ToastMessageBase()
                        .Promise(`Sync is stopping ${sSSU.UserAndResourceRequests[0].Type.toLowerCase()}`, `Sync is stopping ${sSSU.UserAndResourceRequests.length} ${sSSU.UserAndResourceRequests[0].Type.toLowerCase()}s`)
                        .Completed(`Stop sync ${sSSU.UserAndResourceRequests[0].Type.toLowerCase()}`, `Sync has stopped ${sSSU.UserAndResourceRequests.length} ${sSSU.UserAndResourceRequests[0].Type.toLowerCase()}s`)
                        .Built();
                case request instanceof LeaveGroupsTRsRequests:
                    const lGR = request as LeaveGroupsTRsRequests;
                    return new ToastMessageBase()
                        .Promise(`Leaving resources`, `Leaving ${lGR.GroupIds.length} resources`)
                        .Completed(`Leave resources`, `Leaved ${lGR.GroupIds.length} resources`)
                        .Built();   
                             
                default: return undefined;
            }
        }
        catch {
            return undefined;
        }
    }
}
