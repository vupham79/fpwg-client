import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

import { fontFamilies } from './fontFamilies';

const fontListStyles = (theme: Theme) =>
  createStyles({
    root: {
      minWidth: 225
    }
  });

let FONT_CACHE: any = {};

const isServer = typeof window === 'undefined';

function loadFont(family: string | undefined) {
  if (!family || isServer || FONT_CACHE[family]) {
    return;
  }
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.type = 'text/css';
  const css = `@import url('https://fonts.googleapis.com/css?family=${family.replace(
    /\s/gi,
    '+'
  )}');`;
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);

  FONT_CACHE[family] = true;
}

function Row(props: ListChildComponentProps) {
  const { index, style, data } = props;
  const onFontSelected =
    data && data.onFontSelected ? data.onFontSelected : null;
  
  const { family } = data.filteredFontFamilies[index];

  useEffect(() => {
    loadFont(family);
  }, [data.filteredFontFamilies]);

  return (
    <>
      <ListItem
        button
        style={style}
        key={index}
        onClick={() => onFontSelected && onFontSelected(data.filteredFontFamilies[index])}
      >
        <ListItemText
          primary={family}
          style={{ fontFamily: family }}
          disableTypography
        />
      </ListItem>
    </>
  );
}

interface FontListProps {
  className?: string;
  classes?: any;
  onFontSelected?: (family: any) => void;
  searchable?: boolean;
}

function _FontList({ classes, className, onFontSelected, searchable }: FontListProps) {
  const [query, setQuery] = useState('');
  const [filteredFontFamilies, setFilteredFontFamilies] = useState(fontFamilies);

  return (
    <Paper className={clsx(classes.root, className)}>
      {searchable && (
        <ListItem>
          <TextField
            value={query}
            margin="dense"
            variant="outlined"
            placeholder="Search..."
            onChange={(event: any) => {
              const value = event.target.value || '';
              setQuery(value);
              if (value === '') {
                setFilteredFontFamilies(fontFamilies);
              } else {
                setFilteredFontFamilies(fontFamilies.filter((family: any) => {
                  const re = new RegExp(value, 'gi');
                  return re.test(family.family);
                }))
              }
            }}
          />
        </ListItem>
      )}
      <FixedSizeList
        height={300}
        width={225}
        itemSize={46}
        itemCount={filteredFontFamilies.length}
        outerElementType={List}
        itemData={{ onFontSelected, filteredFontFamilies }}
      >
        {Row}
      </FixedSizeList>
    </Paper>
  );
}

const FontList = withStyles(fontListStyles)(_FontList);

interface Props {
  className?: string;
  classes?: any;
  label?: string;
  defaultFont: string | undefined;
  onFontSelected?: (family: any) => void;
  buttonColor?: 'inherit' | 'default' | 'primary' | 'secondary' | undefined;
  buttonVariant?: 'text' | 'outlined' | 'contained' | undefined;
  placement?:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start'
    | undefined;
  searchable?: boolean;
}

const fontPickerStyles = (theme: Theme) =>
  createStyles({
    root: {},
    pickerButton: {
      marginLeft: theme.spacing(2),
      textTransform: 'none'
    }
  });

function GoogleFontPicker({
  className,
  classes,
  defaultFont,
  label,
  onFontSelected,
  placement = 'left',
  buttonColor = 'primary',
  buttonVariant = 'contained',
  searchable,
}: Props) {
  const [currentFont, setCurrentFont] = useState<string | null | undefined>(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  useEffect(() => {
    loadFont(defaultFont);
    setCurrentFont(defaultFont);
  }, [defaultFont]);

  return (
    <div className={clsx(classes.root, className)}>
      <Grid container alignItems="center">
        {label && (
          <Grid item>
            <Typography className={classes.label} variant="body1">
              {label}
            </Typography>
          </Grid>
        )}
        <Grid item>
          <Button
            className={classes.pickerButton}
            onClick={(event: any) => {
              setAnchorEl(anchorEl ? null : event.currentTarget);
            }}
            color={buttonColor}
            variant={buttonVariant}
          >
            <span style={{ fontFamily: currentFont || 'sans-serif' }}>
              {currentFont}
            </span>
          </Button>
        </Grid>
      </Grid>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        <FontList
          onFontSelected={(family: any) => {
            setAnchorEl(null);
            const familyName =
              typeof family === 'string' ? family : family.family;
            setCurrentFont(familyName);
            onFontSelected && onFontSelected(family);
          }}
          searchable={searchable}
        />
      </Popper>
    </div>
  );
}

export default withStyles(fontPickerStyles)(GoogleFontPicker);
