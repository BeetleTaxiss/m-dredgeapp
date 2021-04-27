import React from "react";
import { Menu } from "../../Menu";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

/**
 * use this as a global tracker of userAssigned permissions. Each time a permissionList is created or updated.
 * we will update this value. We also make a function available outside this component that can return this value.
 * */
let globalUserAssignedPermissions = {};

/**
 * Create the accordion for userPermissionList
 * @param {*} userPermissionData
 * @returns
 */
export const createUserPermissionListComponent = (userPermissionData) => {
  let permissionList = [];

  Object.keys(userPermissionData).forEach((menuLocation, k) => {
    const title = (
      <AccordionItemHeading>
        <AccordionItemButton>{menuLocation}</AccordionItemButton>
      </AccordionItemHeading>
    );

    let listItems = [];
    Object.keys(userPermissionData[menuLocation]).forEach((page, m) => {
      const currentPage = userPermissionData[menuLocation][page];
      const { text, link, allowed } = currentPage;

      listItems = listItems.concat(
        <AccordionItemPanel key={m}>
          <div class="n-chk">
            <label class="new-control new-checkbox new-checkbox-rounded checkbox-primary">
              <input 
                type="checkbox"
                class="new-control-input"
                defaultChecked={allowed}
                onClick={(event) => {
                  updatePermissionData(event, menuLocation, page, link, text);
                }}
              />
              <span class="new-control-indicator"></span>
              {text}
            </label>
          </div>
        </AccordionItemPanel>
      );
    });

    /** concat all to the PermissionList array */
    permissionList = permissionList.concat(
      <AccordionItem key={k}>
        {title}
        {listItems}
      </AccordionItem>
    );
  });

  return [<Accordion allowZeroExpanded>{permissionList}</Accordion>];
};

/**
 * Create userPermissionData to be passed over to form modal for user permission accordion creation
 * @param {*} userPermissionList
 * @returns
 */
export const createPermissionList = (userPermissionList) => {
  /**This contains all the permission we have loaded for user
   *  will hold all the permission and every update we make
   * */
  let currentAssignedPermissions = {};

  /** load data from state vale */

  /** The central menu definition within our application */
  const globalMenu = Menu;
  //console.log(globalMenu, "PermissionList Global");

  /**
   * to create the userPermissionData, we will loop over the `globalPermissionList`
   * and for every entry not found in our userPermissionList, we will create a checkbox
   *
   */
  Object.keys(globalMenu).forEach((menuLocation) => {
    /**
     * create an empty object of the menuLocation in our hash table
     * we will ue this object to collect all the sub-menu later
     */
    currentAssignedPermissions[menuLocation] = {};

    /** if user does is not allowed to see any of the pages in this menu location,
     * we will simply list all the sub-menu under this location as not assigned
     */
    if (!userPermissionList[menuLocation]) {
      Object.keys(globalMenu[menuLocation]).forEach((page) => {
        const currentPage = globalMenu[menuLocation][page];

        /** extract just the link and text to setup our permission */
        const { link, text } = currentPage;

        /** set `allowed to false` This will enable us leave the checkbox unchecked */
        currentAssignedPermissions[menuLocation][page] = {
          link,
          text,
          allowed: false,
        };
      });
    } else {
      /**
       * if this menu location is found, we will loop over each child and compare
       * if the user is permitted to see any of the pages in this menu location
       * */
      Object.keys(globalMenu[menuLocation]).forEach((page) => {
        /** get details of current page in global menu */
        const currentPage = globalMenu[menuLocation][page];

        /** extract just the link and text to setup our permission */
        const { link, text } = currentPage;

        /** allowed must be default to false */
        let allowed = false;

        /** check if this page is already assigned for this user */
        if (userPermissionList[menuLocation][page]) {
          const { link, text } = userPermissionList[menuLocation][page];
          if (link === currentPage.link && text === currentPage.text) {
            /** we must check this as allowed */
            allowed = true;
          }
        }
        /** assign to hash table */
        currentAssignedPermissions[menuLocation][page] = {
          link,
          text,
          allowed,
        };
      });
    }
  });
  /** assign to `globalUserAssignedPermissions`  */
  globalUserAssignedPermissions = currentAssignedPermissions;

  return currentAssignedPermissions;
};

/**
 * Use this to update the permission data
 * @param {*} event
 * @param {*} menuLocation
 * @param {*} page
 * @param {*} link
 * @param {*} text
 * @returns
 */
export const updatePermissionData = (event, menuLocation, page, link, text) => {
  const checked = event.target.checked;

  /**
   * we will update the menu location with this details in the `globalUserAssignedPermissions`
   * We are using the global permission because we will still need to keep track of this changes
   * and make provision for us to get it back once user is ready to save changes made for this user
   * */
  if (checked) {
    /** give user access to this menu location and page */
    globalUserAssignedPermissions[menuLocation][page]["allowed"] = true;
  } else {
    /** it must have been assigned before. revoke user permission for this location */
    globalUserAssignedPermissions[menuLocation][page]["allowed"] = false;
  }
  /** return the updated global permission list */
  return globalUserAssignedPermissions;
};

export const getPermissionData = () => {
  /**
   * We need to create a JSON file from our `globalUserAssignedPermissions`
   * such that only where `allowed=true` is use as our user permission
   */

  let userPermissions = {};

  Object.keys(globalUserAssignedPermissions).forEach((menuLocation) => {
    Object.keys(globalUserAssignedPermissions[menuLocation]).forEach((page) => {
      const currentPage = globalUserAssignedPermissions[menuLocation][page];

      const { link, text, allowed } = currentPage;

      if (allowed) {
        /** if this  `menuLocation` entry is not yet in our userPermissions hash , we will add it */
        if (!userPermissions[menuLocation]) {
          userPermissions[menuLocation] = {};
        }

        /** add this page permission for our user */
        userPermissions[menuLocation][page] = { text, link };
      }
    });
  });
  
  /** return the JSON formatted permission string */
  if(Object.keys(userPermissions).length <= 0) {
    return null;
  } else {
    return JSON.stringify(userPermissions);
  }
};
