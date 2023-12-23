import React, { ReactNode } from "react"
import PropTypes from "prop-types";
import clsx from "clsx";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Slider, { SliderThumb } from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { Grid, createTheme, ThemeProvider } from "@mui/material";

import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"

import './disable_selection.css';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    color: '#000',
    backgroundColor: '#fff',
    boxShadow: theme.shadows[3],
    fontSize: 16,
    fontFamily: 'Calibri'
  },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-thumb': {
    height: 16,
    width: 16,
    border: "2px solid currentColor",
    backgroundColor: "#fff",
    "&.central-thumb": {
      backgroundColor: theme.palette.primary.dark,
      width: 16,
      height: 16,
      zIndex: 1000
    },
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'monospace',
    top: -6,
    backgroundColor: 'unset',
    '&:before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
    },
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#bfbfbf',
    height: 25,
    width: 3,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  },
  '& .MuiSlider-markLabel': {
    color: '#888'
  }
}));

function CentralThumbComponent(props: any) {
  const { children, className, ...other } = props;
  const extraClassName = other["data-index"] === 1 ? "central-thumb" : "thumb";
  return (
    <SliderThumb {...other} className={clsx(className, extraClassName)}>
      {children}
    </SliderThumb>
  );
}
CentralThumbComponent.propTypes = {
  children: PropTypes.node
};


const theme = createTheme({
  typography: {
    fontFamily: [
      'Source Sans Pro',
      'sans-serif',
    ].join(','),
  },
});

interface SliderState {
  value: number[]
}

class BoundsSlider extends StreamlitComponentBase<SliderState> {

  public state: SliderState = {
    value: this.props.args["default"]
  }

  private onToggle = (): void => {
    const value = this.state.value
    const step = this.props.args["step"]

    if (this.state.value.length === 2) {
      const newValue = [
        value[0],
        Number((Math.round(((value[0] + value[1]) / 2) / step) * step).toFixed(3)),
        value[1]
      ]
      this.setState({ value: newValue })
      Streamlit.setComponentValue(newValue)
    }

    else {
      const newValue = [
        value[0],
        value[2]
      ]
      this.setState({ value: newValue })
      Streamlit.setComponentValue(newValue)
    }
  }

  public render = (): ReactNode => {
    const args = this.props.args;
    const label: string = args["label"];
    const marks = [
      {
        value: args["lower_bound"],
        label: args["lower_bound"]
      },
      {
        value: args["upper_bound"],
        label: args["upper_bound"]
      },
    ];
    // console.log(`Rendering ${label} with ${this.state.value}`)
    const defaultValue: number[] = args["default"];
    const useCheckBox: boolean = args["use_checkbox"];
    const checkboxWidth = 2;
    const help: string = args["help"];
    const range: number = args["upper_bound"] - args["lower_bound"];
    const value: number[] = this.state.value;
    return (
      <Box sx={{
        mx: 1, my: 0,
        px: 1, py: 0
      }}>
        <Grid container spacing={0} sx={{ m: 0 }} justifyContent="flex-end">
          <Grid item xs={10}>
            <ThemeProvider theme={theme}>
              <Typography id="input-slider" gutterBottom sx={{ p: 0 }}>
                {label}
              </Typography>
            </ThemeProvider>
          </Grid>
          <Grid item xs={2} style={{ display: "flex", justifyContent: "flex-end" }}>
            {
              (help.length > 0) && (
                <LightTooltip placement="left" title={help} sx={{ pl: 1, ml: 1 }}>
                  <HelpOutlineIcon sx={{ fontSize: 16, color: '#777' }} />
                </LightTooltip>
              )
            }
          </Grid>
          {
            useCheckBox && (
              <Grid item xs={checkboxWidth}>
                <Checkbox
                  checked={this.state.value.length === 3}
                  onChange={this.onToggle}
                  sx={{ px: 0 }}
                />
              </Grid>
            )
          }
          <Grid item xs={useCheckBox ? 12 - checkboxWidth : 12}>
            <div className="disable-text-selection">
              <StyledSlider
                getAriaLabel={() => "Range slider"}
                components={this.state.value.length === 3 ? { Thumb: CentralThumbComponent } : {}}
                min={args["lower_bound"]}
                max={args["upper_bound"]}
                step={args["step"]}
                value={this.state.value}
                defaultValue={defaultValue}
                onChange={this.onChange}
                disableSwap={true}
                disabled={this.props.disabled}
                valueLabelDisplay={
                  value.length === 1
                    ? "on"
                    : (value[value.length - 1] - value[0]) / range > .1
                      ? "on"
                      : "auto"
                }
                marks={marks}
                sx={{ mt: 2, mb: 0 }}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    )
  }

  private onChange = (event: Event, value: number | Array<number>, activeThumb: number): void => {
    this.setState({ value: Array.isArray(value) ? value : [value] })
    Streamlit.setComponentValue(value)
  }
}

export default withStreamlitConnection(React.memo(BoundsSlider))
