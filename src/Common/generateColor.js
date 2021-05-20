import React from 'react';
import { mapNumber } from '../utils/map';

const LOW_BOUND = 40;
const HIGH_BOUND = 80;
export function generateColor(numColor) {
  let color;
  if (numColor === null) {
    color = '#fff';
    return color;
  }

  if (numColor <= LOW_BOUND) {
    color = '#ac5857';
  } else if (numColor > LOW_BOUND && numColor < HIGH_BOUND) {
    color = '#ffe627';
  } else if (numColor >= HIGH_BOUND) {
    color = '#a1ff9d';
  }

  return color;
}

export function gradientPercentageColor(numColor) {
  let color;
  if (numColor === null) {
    color = '#fff';
    return color;
  }
  if (numColor <= LOW_BOUND) {
    const mappingValue = mapNumber(numColor, 0, LOW_BOUND, 0, 150);
    color = `rgba(255,${mappingValue},0,0.5)`;
  } else if (numColor > LOW_BOUND && numColor < HIGH_BOUND) {
    const red = mapNumber(numColor, LOW_BOUND, HIGH_BOUND, 255, 200);
    const green = mapNumber(numColor, LOW_BOUND, HIGH_BOUND, 150, 255);
    color = `rgba(${red},${green},0,0.5)`;
  } else if (numColor >= HIGH_BOUND) {
    const mappingValue = mapNumber(numColor, HIGH_BOUND, 100, 200, 0);
    color = `rgba(${mappingValue},255,0,0.5)`;
  }
  return color;
}

export function textColor(value) {
  let color;
  if (value <= LOW_BOUND) {
    color = '#000';
  } else if (value > LOW_BOUND && value < HIGH_BOUND) {
    color = '#000';
  } else if (value >= HIGH_BOUND) {
    color = '#000';
  }

  return color;
}
