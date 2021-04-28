import {Store} from "react-persistent-store-manager"

/**
 * An abject containing all the stores in our application
 */
export const Stores = {

    /** the user details store */
    UserStore:{   
        userId:null, 
        user: null,
        email: null,
        phone: null,
        userType: null,
        login: false,
        permission:null,
        },

    /** the app settings store */
    AppSettingsStore: {
        measurements: null,
        userTypes: null,
        userPermissions: null,
    }
};

/**
 * return all the store our application will use
 */
export const AppStore= Store(Stores);

