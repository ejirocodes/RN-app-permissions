import {PERMISSIONS, check, request, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';

const {IOS, ANDROID} = PERMISSIONS;

const cameraPermissions = {
  IOS,
  ANDROID,
};

const requestPermissionType = {
  camera: cameraPermissions,
};

const permissionType = {
  camera: 'camera',
};

class AppPermission {
  checkPermission = async type => {
    const permission = requestPermissionType[type][Platform.OS];
    if (!permission) {
      return true;
    }
    try {
      const result = await check(permission);
      if (result === RESULTS.GRANTED) {
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  requestPermission = async permission => {
    try {
      const result = await request(permission);
      if (result === RESULTS.GRANTED) {
        console.log(result);
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
}

const appPermission = new AppPermission();

export {appPermission, permissionType};
