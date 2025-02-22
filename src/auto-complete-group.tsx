import {
  Box,
  Flex,
  FlexProps,
  forwardRef,
  Stack,
  StackProps,
  Text,
  TextProps,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { hasFirstOption } from './helpers/group';
import { StoreContext } from './store';

interface AutoCompleteGroup extends StackProps {
  children?: any;
  title?: string;
  titleStyles?: TextProps;
  showDivider?: boolean;
  dividerColor?: string;
}

export const AutoCompleteGroup = forwardRef<AutoCompleteGroup, 'div'>(
  (props, ref) => {
    const {
      title,
      titleStyles: customTitleStyles,
      children,
      showDivider,
      dividerColor,
      ...rest
    } = props;

    const { state } = useContext(StoreContext);

    const noDivider = hasFirstOption(children, state);

    return (
      <div ref={ref}>
        {showDivider && !noDivider && (
          <Flex
            {...baseDividerStyles}
            borderColor={dividerColor || 'inherit'}
          />
        )}
        <Stack spacing="1" {...rest}>
          {title && (
            <Text {...baseTitleStyles} {...customTitleStyles}>
              {title}
            </Text>
          )}
          <Box>{children}</Box>
        </Stack>
      </div>
    );
  }
);

AutoCompleteGroup.displayName = 'AutoCompleteGroup';

const baseDividerStyles: FlexProps = {
  border: '0',
  my: '0.5rem',
  opacity: '0.6',
  borderBottom: 'solid 1px',
};

const baseTitleStyles: TextProps = {
  ml: '5',
  mt: '0.5rem',
  fontSize: 'xs',
  letterSpacing: 'wider',
  fontWeight: 'extrabold',
  textTransform: 'uppercase',
};
