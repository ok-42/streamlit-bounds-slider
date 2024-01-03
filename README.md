# Bounds slider


## Description

This repository introduces a new Streamlit widget &mdash; slider with three thumbs. These thumbs represent some 
desired value and its bounds. The middle thumbs moves within them.

Also, this Streamlit component may be configured to have one or two thumbs. These sliders were introduced to keep 
style consistency and are similar to native components.


## Installation

> TODO Specify Node.js version and add installation commands

`npm install --legacy-peer-deps`


## Usage

After compiling JavaScript and Python code, you obtain a Python library from which you can import that custom 
Streamlit component. There is no need to install any JS tools after you have the Python wheel file.

Possible use case for this component is a controlling dashboard. The user can set the optimal value for some 
parameter and its possible range of values. As the middle thumb doesn't exceed that range, these are lower and upper 
bounds.

```python
from bounds_slider import bounds_slider

lower_bound, target_value, upper_bound = bounds_slider(
    label='Parameter',
    value=42,
    bounds=(0, 100),
    step=1,
    is_single=False,
    initial_bounds=(20, 80),
    tooltip='Help message')
```
