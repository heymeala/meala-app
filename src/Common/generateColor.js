import React from 'react';
export default function generateColor(numColor) {
  let color;
  if (numColor < 40) {
    color = '#ac5857';
  } else if (numColor > 40 && numColor < 80) {
    color = '#ffe627';
  } else if (numColor > 80) {
    color = '#a1ff9d';
  }

  return color;
}
