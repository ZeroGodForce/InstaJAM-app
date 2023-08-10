import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { HeaderButton, HeaderButtonProps } from 'react-navigation-header-buttons';

export const MaterialHeaderButton = (props: HeaderButtonProps) => (
  <HeaderButton IconComponent={MaterialIcons} iconSize={23} {...props} />
);