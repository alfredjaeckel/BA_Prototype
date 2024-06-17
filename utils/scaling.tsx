import { Dimensions } from 'react-native';

// Target dimensions
const DESIGN_WIDTH = 1194;
const DESIGN_HEIGHT = 834;

// Device dimensions
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

// Scaling factors
const scaleX = deviceWidth / DESIGN_WIDTH;
const scaleY = deviceHeight / DESIGN_HEIGHT;

// Exported scalers
export const scaleWidth = (size: number) => size * scaleX;
export const scaleHeight = (size: number) => size * scaleY;
export const scale = (size: number) => size * Math.min(scaleX, scaleY);